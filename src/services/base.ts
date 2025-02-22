import crypto from "node:crypto";
import type { ApiResponse } from "../types/common";

/**
 * Base service class that provides common functionality for all API services.
 * Handles authentication, request signing, and HTTP communication with the Cryptomus API.
 * This class is extended by PaymentsService, PayoutsService, and OtherService.
 *
 * @abstract
 * @class
 */
export abstract class BaseService {
	/**
	 * Creates a new instance of the BaseService.
	 *
	 * @param {string} merchantId - Your Cryptomus merchant ID.
	 * @param {string} paymentKey - Your API key for payment operations.
	 * @param {string} payoutKey - Your API key for payout operations.
	 * @param {string} baseUrl - The base URL of the Cryptomus API.
	 */
	constructor(
		protected readonly merchantId: string,
		protected readonly paymentKey: string,
		protected readonly payoutKey: string,
		protected readonly baseUrl: string,
	) {}

	/**
	 * Generates a signature for API request authentication.
	 * The signature is created by encoding the request payload to base64,
	 * concatenating it with the appropriate API key, and creating an MD5 hash.
	 *
	 * @protected
	 * @param {Record<string, any>} payload - The request payload to sign.
	 * @param {boolean} [isPayment=true] - Whether to use payment key (true) or payout key (false).
	 * @param {boolean} [jsonUnescape=false] - Whether to unescape JSON slashes.
	 * @returns {string} The generated signature in hexadecimal format.
	 *
	 * @example
	 * ```typescript
	 * const payload = { amount: "100", currency: "USD" };
	 * const signature = this.generateSign(payload, true);
	 * ```
	 */
	protected generateSign(
		payload: Record<string, any>,
		isPayment = true,
		jsonUnescape = false,
	): string {
		const encodedBody = Buffer.from(
			jsonUnescape
				? JSON.stringify(payload).replace(/\\/g, "/")
				: JSON.stringify(payload),
		).toString("base64");
		const key = isPayment ? this.paymentKey : this.payoutKey;
		return crypto
			.createHash("md5")
			.update(encodedBody + key)
			.digest("hex");
	}

	/**
	 * Makes an HTTP request to the Cryptomus API.
	 * Handles request signing, error handling, and response parsing.
	 *
	 * @protected
	 * @template T - The expected response type.
	 * @param {string} endpoint - The API endpoint to call (e.g., "/payment/create").
	 * @param {"GET" | "POST"} method - The HTTP method to use.
	 * @param {Record<string, any>} [payload] - Optional request payload for POST requests.
	 * @param {boolean} [isPayment=true] - Whether this is a payment request (true) or payout request (false).
	 * @returns {Promise<T>} A promise that resolves with the API response data.
	 * @throws {Error} If the request fails, returns an error response, or encounters validation errors.
	 *
	 * @example
	 * ```typescript
	 * const response = await this.request<CreatePaymentResponse>(
	 *   "/payment",
	 *   "POST",
	 *   { amount: "100", currency: "USD" }
	 * );
	 * ```
	 */
	protected async request<T>(
		endpoint: string,
		method: "GET" | "POST",
		payload?: Record<string, any>,
		isPayment = true,
	): Promise<T> {
		const body = payload ? JSON.stringify(payload) : '{}';
		const headers = {
			"Content-Type": "application/json",
			merchant: this.merchantId,
			sign: this.generateSign(payload || {}, isPayment),
		};

		const response = await fetch(`${this.baseUrl}${endpoint}`, {
			method,
			headers,
			body,
		});

		if (!response.ok) {
			if (response.status === 422) {
				const data = (await response.json()) as ApiResponse<T>;
				throw new Error(JSON.stringify(data));
			}
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = (await response.json()) as ApiResponse<T>;

		if (data.state === 1) {
			if ("errors" in data) {
				const errorMessages = Object.entries(data.errors)
					.map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
					.join("; ");
				throw new Error(errorMessages);
			}
			throw new Error(data.message);
		}

		return data.result;
	}
}
