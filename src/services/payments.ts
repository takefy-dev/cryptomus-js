import type {
	ListServicesResponse,
	VerifyWebhookSignatureResponse,
} from "../types";
import type {
	BlockStaticWalletRequest,
	BlockStaticWalletResponse,
	CreatePaymentRequest,
	CreatePaymentResponse,
	CreateQrCodeForInvoiceRequest,
	CreateQrCodeForInvoiceResponse,
	CreateQrCodeForWalletRequest,
	CreateQrCodeForWalletResponse,
	CreateWalletRequest,
	CreateWalletResponse,
	GetPaymentInfoRequest,
	GetPaymentInfoResponse,
	GetPaymentsHistoryRequest,
	GetPaymentsHistoryResponse,
	ListDiscountsResponse,
	RefundPaymentOnBlockedWalletRequest,
	RefundPaymentOnBlockedWalletResponse,
	RefundPaymentRequest,
	RefundPaymentResponse,
	ResendWebhookRequest,
	ResendWebhookResponse,
	SetDiscountForPaymentMethodRequest,
	SetDiscountForPaymentMethodResponse,
	TestPaymentWebhookRequest,
	TestPaymentWebhookResponse,
	TestPayoutWebhookRequest,
	TestPayoutWebhookResponse,
	TestWalletWebhookRequest,
	TestWalletWebhookResponse,
	VerifyPaymentWebhookSignatureRequest,
} from "../types/payments";
import { BaseService } from "./base";

/**
 * Service class for handling payment-related operations in the Cryptomus API.
 * Provides methods for creating payments, managing wallets, and handling discounts.
 */
export class PaymentsService extends BaseService {
	/**
	 * Creates a new payment in the Cryptomus system.
	 *
	 * @param {CreatePaymentRequest} data - Payment creation parameters including amount, currency, and order details.
	 * @returns {Promise<CreatePaymentResponse>} A promise that resolves with the created payment details.
	 * @throws {Error} If the payment creation fails or returns an error response.
	 *
	 * @example
	 * ```typescript
	 * const payment = await payments.create({
	 *   amount: "100",
	 *   currency: "USD",
	 *   order_id: "order123"
	 * });
	 * ```
	 */
	async create(params: CreatePaymentRequest): Promise<CreatePaymentResponse> {
		return this.request<CreatePaymentResponse>("/payment", "POST", params);
	}

	/**
	 * Creates a new wallet for receiving payments.
	 *
	 * @param {CreateWalletRequest} data - Parameters for creating the wallet.
	 * @returns {Promise<CreateWalletResponse>} A promise that resolves with the created wallet details.
	 * @throws {Error} If the request fails or returns an error response.
	 *
	 * @example
	 * ```typescript
	 * const wallet = await payments.createWallet({
	 *   currency: "USDT",
	 *   network: "TRX",
	 *   order_id: "wallet123"
	 * });
	 * ```
	 */
	async createWallet(
		params: CreateWalletRequest,
	): Promise<CreateWalletResponse> {
		return this.request<CreateWalletResponse>("/wallet", "POST", params);
	}

	/**
	 * Generates a QR code for a specific wallet address.
	 *
	 * @param {CreateQrCodeForWalletRequest} data - Parameters for generating the QR code.
	 * @returns {Promise<CreateQrCodeForWalletResponse>} A promise that resolves with the QR code details.
	 * @throws {Error} If the request fails or returns an error response.
	 *
	 * @example
	 * ```typescript
	 * const qr = await payments.createQrCodeForWallet({
	 *   wallet_address_uuid: "wallet-uuid"
	 * });
	 * ```
	 */
	async createQrCodeForWallet(
		params: CreateQrCodeForWalletRequest,
	): Promise<CreateQrCodeForWalletResponse> {
		return this.request<CreateQrCodeForWalletResponse>(
			"/wallet/qr",
			"POST",
			params,
		);
	}

	async createQrCodeForInvoice(
		params: CreateQrCodeForInvoiceRequest,
	): Promise<CreateQrCodeForInvoiceResponse> {
		return this.request<CreateQrCodeForInvoiceResponse>(
			"/payment/qr",
			"POST",
			params,
		);
	}

	async blockStaticWallet(
		params: BlockStaticWalletRequest,
	): Promise<BlockStaticWalletResponse> {
		return this.request<BlockStaticWalletResponse>(
			"/wallet/block-address",
			"POST",
			params,
		);
	}

	async refundPaymentOnBlockedWallet(
		params: RefundPaymentOnBlockedWalletRequest,
	): Promise<RefundPaymentOnBlockedWalletResponse> {
		return this.request<RefundPaymentOnBlockedWalletResponse>(
			"/wallet/blocked-address-refund",
			"POST",
			params,
		);
	}

	/**
	 * Retrieves information about a specific payment.
	 *
	 * @param {GetPaymentInfoRequest} data - Parameters to identify the payment (uuid or order_id).
	 * @returns {Promise<GetPaymentInfoResponse>} A promise that resolves with the payment information.
	 * @throws {Error} If the request fails or returns an error response.
	 *
	 * @example
	 * ```typescript
	 * const info = await payments.getInfo({
	 *   uuid: "payment-uuid"
	 * });
	 * ```
	 */
	async getInfo(
		params: GetPaymentInfoRequest,
	): Promise<GetPaymentInfoResponse> {
		return this.request<GetPaymentInfoResponse>(
			"/payment/info",
			"POST",
			params,
		);
	}

	async refund(params: RefundPaymentRequest): Promise<RefundPaymentResponse> {
		return this.request<RefundPaymentResponse>(
			"/payment/refund",
			"POST",
			params,
		);
	}

	async resendWebhook(
		params: ResendWebhookRequest,
	): Promise<ResendWebhookResponse> {
		return this.request<ResendWebhookResponse>(
			"/payment/resend",
			"POST",
			params,
		);
	}

	async testPaymentWebhook(
		params: TestPaymentWebhookRequest,
	): Promise<TestPaymentWebhookResponse> {
		return this.request<TestPaymentWebhookResponse>(
			"/test-webhook/payment",
			"POST",
			params,
		);
	}

	async testPayoutWebhook(
		params: TestPayoutWebhookRequest,
	): Promise<TestPayoutWebhookResponse> {
		return this.request<TestPayoutWebhookResponse>(
			"/test-webhook/payout",
			"POST",
			params,
		);
	}

	async testWalletWebhook(
		params: TestWalletWebhookRequest,
	): Promise<TestWalletWebhookResponse> {
		return this.request<TestWalletWebhookResponse>(
			"/test-webhook/wallet",
			"POST",
			params,
		);
	}

	/**
	 * Retrieves a list of available payment services and their details.
	 *
	 * @returns {Promise<ListServicesResponse>} A promise that resolves with the list of payment services.
	 * @throws {Error} If the request fails or returns an error response.
	 *
	 * @example
	 * ```typescript
	 * const services = await payments.listServices();
	 * ```
	 */
	async listServices(): Promise<ListServicesResponse> {
		return this.request<ListServicesResponse>("/payment/services", "POST");
	}

	/**
	 * Retrieves payment history based on specified date range and filters.
	 *
	 * @param {GetPaymentsHistoryRequest} data - Parameters for filtering payment history.
	 * @returns {Promise<GetPaymentsHistoryResponse>} A promise that resolves with the payment history.
	 * @throws {Error} If the request fails or returns an error response.
	 *
	 * @example
	 * ```typescript
	 * const history = await payments.getHistory({
	 *   date_from: "2025-01-01",
	 *   date_to: "2025-02-01"
	 * });
	 * ```
	 */
	async getHistory(
		params: GetPaymentsHistoryRequest,
	): Promise<GetPaymentsHistoryResponse> {
		return this.request<GetPaymentsHistoryResponse>(
			"/payment/list",
			"POST",
			params,
		);
	}

	async verifyWebhookSignature(
		params: VerifyPaymentWebhookSignatureRequest,
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
			this.generateSign(request, true, true) !== request.sign
		) {
			return false;
		}

		return true;
	}

	/**
	 * Retrieves a list of available discounts for payments.
	 *
	 * @returns {Promise<ListDiscountsResponse>} A promise that resolves with the list of discounts.
	 * @throws {Error} If the request fails or returns an error response.
	 *
	 * @example
	 * ```typescript
	 * const discounts = await payments.listDiscounts();
	 * ```
	 */
	async listDiscounts(): Promise<ListDiscountsResponse> {
		return this.request<ListDiscountsResponse>(
			"/payment/discount/list",
			"POST",
			undefined,
			true,
		);
	}

	/**
	 * Sets or updates a discount for payments.
	 *
	 * @param {SetDiscountForPaymentMethodRequest} data - Parameters for setting the discount.
	 * @returns {Promise<SetDiscountForPaymentMethodResponse>} A promise that resolves with the updated discount details.
	 * @throws {Error} If the request fails or returns an error response.
	 *
	 * @example
	 * ```typescript
	 * const discount = await payments.setDiscount({
	 *   currency: "USDT",
	 *   percent: 5
	 * });
	 * ```
	 */
	async setDiscount(
		params: SetDiscountForPaymentMethodRequest,
	): Promise<SetDiscountForPaymentMethodResponse> {
		return this.request<SetDiscountForPaymentMethodResponse>(
			"/payment/discount/set",
			"POST",
			params,
			true,
		);
	}
}
