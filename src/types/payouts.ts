import type { Paginate, VerifyWebhookSignatureRequest } from "./common";

type PayoutStatus =
	| "process"
	| "check"
	| "paid"
	| "fail"
	| "cancel"
	| "system_fail";

export interface CreatePayoutRequest {
	amount: string;
	currency: string;
	order_id: string;
	address: string;
	is_subtract: boolean;
	network: string;
	url_callback?: string;
	to_currency?: string;
	course_source?: "Binance" | "BinanceP2p" | "Exmo" | "Kucoin" | "Garantexio";
	from_currency?: string;
	priority?: "recommended" | "economy" | "high" | "highest";
	memo?: string;
}

export interface Payout {
	uuid: string;
	amount: string;
	currency: string;
	network: string;
	address: string;
	txid?: string;
	status: PayoutStatus;
	is_final: boolean;
	balance: number;
	payer_currency: string;
	payer_amount: number;
}

export type CreatePayoutResponse = Payout;

export interface GetPayoutInfoRequest {
	uuid: string;
	order_id: string;
}

export type GetPayoutInfoResponse = Payout;

export interface GetPayoutHistoryRequest {
	date_from?: string;
	date_to?: string;
}

export type GetPayoutHistoryResponse = {
	items: Payout[];
	paginate: Paginate;
};

export type VerifyPayoutWebhookSignatureRequest =
	VerifyWebhookSignatureRequest<{
		type: "payout";
		uuid: string;
		order_id: string;
		amount: string;
		merchant_amount: string;
		commission: string;
		is_final: boolean;
		status: PayoutStatus;
		txid?: string;
		currency: string;
		network: string;
		payer_currency: string;
		payer_amount: string;
		sign: string;
	}>;

export interface TransferToPersonalWalletRequest {
	amount: string;
	currency: string;
}

export interface TransferToPersonalWalletResponse {
	user_wallet_transaction_uuid: string;
	user_wallet_balance: string;
	merchant_transaction_uuid: string;
	merchant_balance: string;
}

export interface TransferToBusinessWalletRequest {
	amount: string;
	currency: string;
}

export interface TransferToBusinessWalletResponse {
	user_wallet_transaction_uuid: string;
	user_wallet_balance: string;
	merchant_transaction_uuid: string;
	merchant_balance: string;
}
