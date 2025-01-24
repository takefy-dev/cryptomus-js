import type { GetExchangeRatesForCurrencyResponse } from "../types/other";
import { BaseService } from "./base";

/**
 * Service class for handling miscellaneous Cryptomus API operations.
 * Currently supports retrieving exchange rates.
 */
export class OtherService extends BaseService {
	/**
	 * Retrieves current exchange rates for a specific currency.
	 *
	 * @param {string} currency - The currency code to get exchange rates for (e.g., "USDT", "BTC").
	 * @returns {Promise<GetExchangeRatesForCurrencyResponse>} A promise that resolves with the exchange rates.
	 * @throws {Error} If the request fails or returns an error response.
	 *
	 * @example
	 * ```typescript
	 * const rates = await client.other.getExchangeRatesForCurrency("USDT");
	 * console.log(rates[0].course); // Current exchange rate
	 * ```
	 */
	async getExchangeRatesForCurrency(
		currency: string,
	): Promise<GetExchangeRatesForCurrencyResponse> {
		return this.request<GetExchangeRatesForCurrencyResponse>(
			`/exchange-rate/${currency}/list`,
			"GET",
			undefined,
		);
	}
}
