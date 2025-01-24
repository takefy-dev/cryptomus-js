import { describe, expect, test } from "bun:test";
import { CryptomusClient } from "../src";
import type { GetExchangeRatesForCurrencyResponse } from "../src/types/other";

describe("OtherService", () => {
	const client = new CryptomusClient({
		merchantId: process.env.MERCHANT_ID || "",
		paymentKey: process.env.PAYMENT_KEY || "",
		payoutKey: process.env.PAYOUT_KEY || "",
	});

	describe("exchange rates", () => {
		test("should get exchange rates for currency", async () => {
			const rates = await client.other.getExchangeRatesForCurrency("USDT");
			expect(rates).toBeDefined();
			const ratesArray =
				rates as unknown as GetExchangeRatesForCurrencyResponse[];
			expect(Array.isArray(ratesArray)).toBe(true);
			if (ratesArray.length > 0) {
				const rate = ratesArray[0];
				expect(rate.from).toBeDefined();
				expect(rate.to).toBeDefined();
				expect(rate.course).toBeDefined();
			}
		});
	});
});
