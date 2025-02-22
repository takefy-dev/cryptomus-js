"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptomusClient = void 0;
var other_1 = require("./services/other");
var payments_1 = require("./services/payments");
var payouts_1 = require("./services/payouts");
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
var CryptomusClient = /** @class */ (function () {
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
    function CryptomusClient(config) {
        /** Base URL for the Cryptomus API */
        this.baseUrl = "https://api.cryptomus.com/v1";
        this.payments = new payments_1.PaymentsService(config.merchantId, config.paymentKey, config.payoutKey, this.baseUrl);
        this.payouts = new payouts_1.PayoutsService(config.merchantId, config.paymentKey, config.payoutKey, this.baseUrl);
        this.other = new other_1.OtherService(config.merchantId, config.paymentKey, config.payoutKey, this.baseUrl);
    }
    return CryptomusClient;
}());
exports.CryptomusClient = CryptomusClient;
__exportStar(require("./types"), exports);
