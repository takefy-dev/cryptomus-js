export interface Currency {
	currency: string;
	network: string;
}

export interface ApiValidationErrorResponse {
	state: 1;
	errors: {
		[key: string]: string[];
	};
}

export interface ApiGenericErrorResponse {
	state: 1;
	message: string;
}

// Union type for all error responses
export type ApiErrorResponse =
	| ApiValidationErrorResponse
	| ApiGenericErrorResponse;

export interface ApiSuccessResponse<T> {
	state: 0;
	result: T;
}

// Combined type for all possible responses
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface Paginate {
	count: number;
	hasPages: boolean;
	nextCursor?: string;
	previousCursor?: string;
	perPage: number;
}

export type VerifyWebhookSignatureResponse = boolean;

export interface VerifyWebhookSignatureRequest<T> {
	ipAddress?: string;
	request: T;
}

export interface ListServicesResponse {
	network: string;
	currency: string;
	is_available: boolean;
	limit: {
		min_amount: string;
		max_amount: string;
	};
	commission: {
		fee_amount: string;
		percent: string;
	};
}
[];
