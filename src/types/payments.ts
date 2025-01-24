import type {
	Currency,
	Paginate,
	VerifyWebhookSignatureRequest,
} from "./common";

type PaymentStatus =
	| "paid"
	| "paid_over"
	| "wrong_amount"
	| "process"
	| "confirm_check"
	| "wrong_amount_waiting"
	| "check"
	| "fail"
	| "cancel"
	| "system_fail"
	| "refund_process"
	| "refund_fail"
	| "refund_paid"
	| "locked";

export interface CreatePaymentRequest {
	amount: string | number;
	currency: string;
	order_id: string;
	network?: string;
	url_callback?: string;
	url_return?: string;
	url_success?: string;
	is_payment_multiple?: "true" | "false";
	lifetime?: number;
	to_currency?: string;
	subtract?: number;
	accuracy_payment_percent?: number;
	additional_data?: string;
	currencies?: Currency[];
	except_currencies?: Currency[];
	course_source?: string;
	from_referral_code?: string;
	discount_percent?: number;
	is_refresh?: "true" | "false";
}

export interface Payment {
	uuid: string;
	order_id: string;
	amount: string;
	payment_amount?: string;
	payer_amount?: string;
	discount_percent?: number;
	discount: string;
	payer_currency?: string;
	currency: string;
	merchant_amount?: string;
	network?: string;
	address?: string;
	from?: string;
	txid?: string;
	payment_status: PaymentStatus;
	url: string;
	expired_at: number;
	status: PaymentStatus;
	is_final: boolean;
	additional_data?: string;
	created_at: string;
	updated_at: string;
}

export type CreatePaymentResponse = Payment;

export interface CreateWalletRequest {
	currency: string;
	network: string;
	order_id: string;
	url_callback?: string;
	from_referral_code?: string;
}

export interface CreateWalletResponse {
	uuid: string;
	wallet_uuid: string;
	address: string;
	network: string;
	currency: string;
	url: string;
}

export interface CreateQrCodeForWalletRequest {
	wallet_address_uuid: string;
}

export interface CreateQrCodeForWalletResponse {
	image: string;
}

export interface CreateQrCodeForInvoiceRequest {
	merchant_payment_uuid: string;
}

export interface CreateQrCodeForInvoiceResponse {
	image: string;
}

export interface BlockStaticWalletRequest {
	uuid: string;
	order_id: string;
	is_force_refund: "true" | "false";
}

export interface BlockStaticWalletResponse {
	status: "blocked" | "active" | "in_active";
	uuid: string;
}

export interface RefundPaymentOnBlockedWalletRequest {
	uuid: string;
	order_id: string;
	address: string;
}

export interface RefundPaymentOnBlockedWalletResponse {
	commission: string;
	amount: string;
}

export interface GetPaymentInfoRequest {
	uuid: string;
	order_id: string;
}

export type GetPaymentInfoResponse = Payment;

export interface RefundPaymentRequest {
	address: string;
	is_substract: "true" | "false";
	uuid: string;
	order_id: string;
}

export type RefundPaymentResponse = any[];

export interface ResendWebhookRequest {
	uuid: string;
	order_id: string;
}

export type ResendWebhookResponse = any[];

export type TestWebhookRequest = {
	url_callback: string;
	currency: string;
	network: string;
	amount: string;
	uuid: string;
	order_id: string;
	status:
		| "process"
		| "check"
		| "paid"
		| "paid_over"
		| "fail"
		| "wrong_amount"
		| "cancel"
		| "system_fail"
		| "refund_process"
		| "refund_fail"
		| "refund_paid";
};

export type TestPaymentWebhookRequest = TestWebhookRequest;

export type TestPaymentWebhookResponse = any[];

export type TestPayoutWebhookRequest = TestWebhookRequest;

export type TestPayoutWebhookResponse = any[];

export type TestWalletWebhookRequest = TestWebhookRequest;

export type TestWalletWebhookResponse = any[];

export interface GetPaymentsHistoryRequest {
	date_from?: string;
	date_to?: string;
}

export interface GetPaymentsHistoryResponse {
	items: Payment[];
	paginate: Paginate;
}

export type VerifyPaymentWebhookSignatureRequest =
	VerifyWebhookSignatureRequest<{
		type: string;
		uuid: string;
		order_id: string;
		amount: string;
		payment_amount: string;
		payment_amount_usd: string;
		merchant_amount: string;
		commission: string;
		is_final: boolean;
		status:
			| "confirm_check"
			| "paid"
			| "paid_over"
			| "fail"
			| "wrong_amount"
			| "cancel"
			| "system_fail"
			| "refund_process"
			| "refund_fail"
			| "refund_paid";
		from: string;
		wallet_address_uuid: string | null;
		network: string;
		currency: string;
		payer_currency: string;
		additional_data: any;
		convert: {
			to_currency: string;
			commission: string | null;
			rate: string;
			amount: string;
		};
		txid: string;
		sign: string;
	}>;

export interface ListDiscountsResponse {
	currency: string;
	network: string;
	discount: number;
}

export interface SetDiscountForPaymentMethodRequest {
	currency: string;
	network: string;
	discount_percent: number;
}

export interface SetDiscountForPaymentMethodResponse {
	currency: string;
	network: string;
	discount: string;
}
