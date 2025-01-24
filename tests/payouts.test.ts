import { describe, expect, test } from "bun:test";
import { CryptomusClient } from "../src";

describe("PayoutsService", () => {
	const client = new CryptomusClient({
		merchantId: process.env.MERCHANT_ID || "",
		paymentKey: process.env.PAYMENT_KEY || "",
		payoutKey: process.env.PAYOUT_KEY || "",
	});

	describe("payouts", () => {
		test("should create a payout", async () => {
			const payout = await client.payouts.create({
				amount: "50",
				currency: "USDT",
				network: "TRX",
				address: "your-wallet-address",
				order_id: `payout-${Date.now()}`,
				is_subtract: false,
			});

			expect(payout).toBeDefined();
			expect(payout.uuid).toBeDefined();
			expect(payout.amount).toBeDefined();
		});

		test("should get payout info", async () => {
			// First create a payout
			const payout = await client.payouts.create({
				amount: "50",
				currency: "USDT",
				network: "TRX",
				address: "your-wallet-address",
				order_id: `payout-${Date.now()}`,
				is_subtract: false,
			});

			const info = await client.payouts.getInfo({
				uuid: payout.uuid,
				order_id: `payout-${Date.now()}`,
			});

			expect(info).toBeDefined();
			expect(info.uuid).toBe(payout.uuid);
		});

		test("should list payout services", async () => {
			const services = await client.payouts.listServices();
			expect(services).toBeDefined();
			expect(Array.isArray(services)).toBe(true);
		});

		test("should get payout history", async () => {
			const history = await client.payouts.getHistory({
				date_from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
				date_to: new Date().toISOString(),
			});

			expect(history).toBeDefined();
			expect(history.items).toBeDefined();
			expect(Array.isArray(history.items)).toBe(true);
		});
	});

	describe("wallet transfers", () => {
		test("should transfer to personal wallet", async () => {
			const result = await client.payouts.transferToPersonalWallet({
				amount: "10",
				currency: "USDT",
			});

			expect(result).toBeDefined();
			expect(result.user_wallet_transaction_uuid).toBeDefined();
			expect(result.merchant_transaction_uuid).toBeDefined();
		});

		test("should transfer to business wallet", async () => {
			const result = await client.payouts.transferToBusinessWallet({
				amount: "10",
				currency: "USDT",
			});

			expect(result).toBeDefined();
			expect(result.user_wallet_transaction_uuid).toBeDefined();
			expect(result.merchant_transaction_uuid).toBeDefined();
		});
	});
});
