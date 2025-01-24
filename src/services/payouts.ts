import type {
	ListServicesResponse,
	VerifyWebhookSignatureResponse,
} from "../types";
import type {
	CreatePayoutRequest,
	CreatePayoutResponse,
	GetPayoutHistoryRequest,
	GetPayoutHistoryResponse,
	GetPayoutInfoRequest,
	GetPayoutInfoResponse,
	TransferToBusinessWalletRequest,
	TransferToBusinessWalletResponse,
	TransferToPersonalWalletRequest,
	TransferToPersonalWalletResponse,
	VerifyPayoutWebhookSignatureRequest,
} from "../types/payouts";
import { BaseService } from "./base";

/**
 * Service class for handling payout-related operations in the Cryptomus API.
 * Provides methods for creating payouts, transferring funds, and managing payout history.
 */
export class PayoutsService extends BaseService {
	/**
	 * Creates a new payout to a specified wallet address.
	 *
	 * @param {CreatePayoutRequest} data - Payout creation parameters including amount, currency, and destination.
	 * @returns {Promise<CreatePayoutResponse>} A promise that resolves with the created payout details.
	 * @throws {Error} If the payout creation fails or returns an error response.
	 *
	 * @example
	 * ```typescript
	 * const payout = await payouts.create({
	 *   amount: "50",
	 *   currency: "USDT",
	 *   network: "TRX",
	 *   address: "wallet-address",
	 *   order_id: "payout123"
	 * });
	 * ```
	 */
	async create(data: CreatePayoutRequest): Promise<CreatePayoutResponse> {
		return this.request<CreatePayoutResponse>("/payout", "POST", data, false);
	}

	/**
	 * Retrieves information about a specific payout.
	 *
	 * @param {GetPayoutInfoRequest} data - Parameters to identify the payout (uuid or order_id).
	 * @returns {Promise<GetPayoutInfoResponse>} A promise that resolves with the payout information.
	 * @throws {Error} If the request fails or returns an error response.
	 *
	 * @example
	 * ```typescript
	 * const info = await payouts.getInfo({
	 *   uuid: "payout-uuid"
	 * });
	 * ```
	 */
	async getInfo(data: GetPayoutInfoRequest): Promise<GetPayoutInfoResponse> {
		return this.request<GetPayoutInfoResponse>(
			"/payout/info",
			"POST",
			data,
			false,
		);
	}

	/**
	 * Retrieves a list of available payout services and their details.
	 *
	 * @returns {Promise<ListServicesResponse>} A promise that resolves with the list of payout services.
	 * @throws {Error} If the request fails or returns an error response.
	 *
	 * @example
	 * ```typescript
	 * const services = await payouts.listServices();
	 * ```
	 */
	async listServices(): Promise<ListServicesResponse> {
		return this.request<ListServicesResponse>(
			"/payout/services",
			"POST",
			undefined,
			false,
		);
	}

	/**
	 * Retrieves payout history based on specified date range and filters.
	 *
	 * @param {GetPayoutHistoryRequest} data - Parameters for filtering payout history.
	 * @returns {Promise<GetPayoutHistoryResponse>} A promise that resolves with the payout history.
	 * @throws {Error} If the request fails or returns an error response.
	 *
	 * @example
	 * ```typescript
	 * const history = await payouts.getHistory({
	 *   date_from: "2025-01-01",
	 *   date_to: "2025-02-01"
	 * });
	 * ```
	 */
	async getHistory(
		data: GetPayoutHistoryRequest,
	): Promise<GetPayoutHistoryResponse> {
		return this.request<GetPayoutHistoryResponse>(
			"/payout/list",
			"POST",
			data,
			false,
		);
	}

	async verifyWebhookSignature(
		params: VerifyPayoutWebhookSignatureRequest,
	): Promise<VerifyWebhookSignatureResponse> {
		const { ipAddress, request } = params;
		if (
			ipAddress &&
			typeof ipAddress === "string" &&
			ipAddress !== "91.227.144.54"
		) {
			return false;
		}

		if (
			request.sign &&
			typeof request.sign === "string" &&
			this.generateSign(request, false, true) !== request.sign
		) {
			return false;
		}

		return true;
	}

	/**
	 * Transfers funds to a personal wallet.
	 *
	 * @param {TransferToPersonalWalletRequest} data - Parameters for the transfer operation.
	 * @returns {Promise<TransferToPersonalWalletResponse>} A promise that resolves with the transfer details.
	 * @throws {Error} If the transfer fails or returns an error response.
	 *
	 * @example
	 * ```typescript
	 * const transfer = await payouts.transferToPersonalWallet({
	 *   amount: "10",
	 *   currency: "USDT"
	 * });
	 * ```
	 */
	async transferToPersonalWallet(
		data: TransferToPersonalWalletRequest,
	): Promise<TransferToPersonalWalletResponse> {
		return this.request<TransferToPersonalWalletResponse>(
			"/payout/wallet",
			"POST",
			data,
			false,
		);
	}

	async transferToBusinessWallet(
		params: TransferToBusinessWalletRequest,
	): Promise<TransferToBusinessWalletResponse> {
		return this.request<TransferToBusinessWalletResponse>(
			"/transfer/to-business",
			"POST",
			params,
			false,
		);
	}
}
