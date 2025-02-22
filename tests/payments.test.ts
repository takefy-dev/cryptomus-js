import { describe, expect, test } from "bun:test";
import { CryptomusClient } from "../src";

describe("PaymentsService", () => {
	const client = new CryptomusClient({
		merchantId: process.env.MERCHANT_ID || "",
		paymentKey: process.env.PAYMENT_KEY || "",
		payoutKey: process.env.PAYOUT_KEY || "",
	});

	describe("payments", () => {
		test("should create a payment", async () => {
			const payment = await client.payments.create({
				amount: "100",
				currency: "USD",
				order_id: `test-${Date.now()}`,
				url_callback: "https://your-callback-url.com/webhook",
				url_return: "https://your-site.com/success",
				url_success: "https://your-site.com/success",
				is_payment_multiple: false,
				lifetime: 3600,
				currencies: [
					{ currency: "USDT", network: "TRX" },
					{ currency: "BTC", network: "BTC" },
				],
			});

			expect(payment).toBeDefined();
			expect(payment.uuid).toBeDefined();
			expect(payment.order_id).toBeDefined();
		});

		test("should get payment info", async () => {
			// First create a payment
			const payment = await client.payments.create({
				amount: "100",
				currency: "USD",
				order_id: `test-${Date.now()}`,
			});

			const info = await client.payments.getInfo({
				uuid: payment.uuid,
				order_id: payment.order_id,
			});

			expect(info).toBeDefined();
			expect(info.uuid).toBe(payment.uuid);
		});

		test("should list payment services", async () => {
			const services = await client.payments.listServices();
			expect(services).toBeDefined();
			expect(Array.isArray(services)).toBe(true);
		});

		test("should get payment history", async () => {
			const history = await client.payments.getHistory({
				date_from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
				date_to: new Date().toISOString(),
			});

			expect(history).toBeDefined();
			expect(history.items).toBeDefined();
			expect(Array.isArray(history.items)).toBe(true);
		});
	});

	describe("discounts", () => {
		test("should list discounts", async () => {
			const discounts = await client.payments.listDiscounts();
			expect(discounts).toBeDefined();
			expect(Array.isArray(discounts)).toBe(true);
		});

		test("should set discount", async () => {
			const result = await client.payments.setDiscount({
				currency: "USDT",
				network: "TRX",
				discount_percent: 5,
			});

			expect(result).toBeDefined();
			expect(result.currency).toBe("USDT");
			expect(result.network).toBe("TRX");
		});
	});

	describe("wallets", () => {
		test("should create a wallet", async () => {
			const wallet = await client.payments.createWallet({
				currency: "USDT",
				network: "TRX",
				order_id: `wallet-${Date.now()}`,
			});

			expect(wallet).toBeDefined();
			expect(wallet.wallet_uuid).toBeDefined();
			expect(wallet.address).toBeDefined();
		});

		test("should create QR code for wallet", async () => {
			// First create a wallet
			const wallet = await client.payments.createWallet({
				currency: "USDT",
				network: "TRX",
				order_id: `wallet-${Date.now()}`,
			});

			const qr = await client.payments.createQrCodeForWallet({
				wallet_address_uuid: wallet.wallet_uuid,
			});

			expect(qr).toBeDefined();
			expect(qr.image).toBeDefined();
		});
	});
});
