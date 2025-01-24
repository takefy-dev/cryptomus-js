import { OtherService } from "./services/other";
import { PaymentsService } from "./services/payments";
import { PayoutsService } from "./services/payouts";
import type { CryptomusConfig } from "./types/config";

/**
 * Main client class for interacting with the Cryptomus API.
 * Provides access to payments, payouts, and other services through a unified interface.
 *
 * @class
 * @example
 * ```typescript
 * const client = new CryptomusClient({
 *   merchantId: "your-merchant-id",
 *   paymentKey: "your-payment-key",
 *   payoutKey: "your-payout-key"
 * });
 *
 * // Create a payment
 * const payment = await client.payments.create({
 *   amount: "100",
 *   currency: "USD",
 *   order_id: "test-123"
 * });
 *
 * // Create a payout
 * const payout = await client.payouts.create({
 *   amount: "50",
 *   currency: "USDT",
 *   network: "TRX",
 *   address: "wallet-address"
 * });
 *
 * // Get exchange rates
 * const rates = await client.other.getExchangeRatesForCurrency("USDT");
 * ```
 */
export class CryptomusClient {
	/** Base URL for the Cryptomus API */
	private readonly baseUrl = "https://api.cryptomus.com/v1";

	/**
	 * Service for handling payment operations.
	 * Includes methods for creating payments, managing wallets, and handling discounts.
	 */
	public readonly payments: PaymentsService;

	/**
	 * Service for handling payout operations.
	 * Includes methods for creating payouts and transferring funds.
	 */
	public readonly payouts: PayoutsService;

	/**
	 * Service for other utility operations.
	 * Currently includes methods for retrieving exchange rates.
	 */
	public readonly other: OtherService;

	/**
	 * Creates a new instance of the CryptomusClient.
	 *
	 * @param {CryptomusConfig} config - Configuration object containing API credentials.
	 * @param {string} config.merchantId - Your Cryptomus merchant ID.
	 * @param {string} config.paymentKey - Your API key for payment operations.
	 * @param {string} config.payoutKey - Your API key for payout operations.
	 *
	 * @throws {Error} If required configuration parameters are missing.
	 */
	constructor(config: CryptomusConfig) {
		this.payments = new PaymentsService(
			config.merchantId,
			config.paymentKey,
			config.payoutKey,
			this.baseUrl,
		);

		this.payouts = new PayoutsService(
			config.merchantId,
			config.paymentKey,
			config.payoutKey,
			this.baseUrl,
		);

		this.other = new OtherService(
			config.merchantId,
			config.paymentKey,
			config.payoutKey,
			this.baseUrl,
		);
	}
}

export * from "./types";
