import { CryptomusClient } from "./index";

async function test() {
	// Initialize the client
	const client = new CryptomusClient({
		merchantId: process.env.MERCHANT_ID || "",
		paymentKey: process.env.PAYMENT_KEY || "",
		payoutKey: process.env.PAYOUT_KEY || "",
	});

	try {
		// Test payment methods
		console.log("\n=== Testing Payment Methods ===");

		// Create payment
		const payment = await client.payments.create({
			amount: "100",
			currency: "USD",
			order_id: `test-${Date.now()}`,
			url_callback: "https://your-callback-url.com/webhook",
			url_return: "https://your-site.com/success",
			url_success: "https://your-site.com/success",
			is_payment_multiple: "false",
			lifetime: 3600,
			currencies: [
				{ currency: "USDT", network: "TRX" },
				{ currency: "BTC", network: "BTC" },
			],
		});
		console.log("Created payment:", payment);

		// Get payment info
		const paymentInfo = await client.payments.getInfo({
			uuid: payment.uuid,
			order_id: payment.order_id,
		});
		console.log("Payment info:", paymentInfo);

		// Test payment services
		const paymentServices = await client.payments.listServices();
		console.log("Available payment services:", paymentServices);

		// Test payment history
		const paymentHistory = await client.payments.getHistory({
			date_from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Last 24 hours
			date_to: new Date().toISOString(),
		});
		console.log("Payment history:", paymentHistory);

		// Test discounts
		console.log("\n=== Testing Discount Methods ===");

		// List discounts
		const discounts = await client.payments.listDiscounts();
		console.log("Current discounts:", discounts);

		// Set discount
		const setDiscountResult = await client.payments.setDiscount({
			currency: "USDT",
			network: "TRX",
			discount_percent: 5,
		});
		console.log("Set discount result:", setDiscountResult);

		// Test wallet methods
		console.log("\n=== Testing Wallet Methods ===");

		// Create wallet
		const wallet = await client.payments.createWallet({
			currency: "USDT",
			network: "TRX",
			order_id: `wallet-${Date.now()}`,
		});
		console.log("Created wallet:", wallet);

		// Create QR code for wallet
		const walletQr = await client.payments.createQrCodeForWallet({
			wallet_address_uuid: wallet.wallet_uuid,
		});
		console.log("Wallet QR code:", walletQr);

		// Test payout methods
		console.log("\n=== Testing Payout Methods ===");

		// Create payout
		const payout = await client.payouts.create({
			amount: "50",
			currency: "USDT",
			network: "TRX",
			address: "your-wallet-address",
			order_id: `payout-${Date.now()}`,
			is_subtract: false,
		});
		console.log("Created payout:", payout);

		// Get payout info
		const payoutInfo = await client.payouts.getInfo({
			uuid: payout.uuid,
			order_id: `payout-${Date.now()}`,
		});
		console.log("Payout info:", payoutInfo);

		// Test payout services
		const payoutServices = await client.payouts.listServices();
		console.log("Available payout services:", payoutServices);

		// Test payout history
		const payoutHistory = await client.payouts.getHistory({
			date_from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Last 24 hours
			date_to: new Date().toISOString(),
		});
		console.log("Payout history:", payoutHistory);

		// Test wallet transfers
		console.log("\n=== Testing Wallet Transfers ===");

		// Transfer to personal wallet
		const personalTransfer = await client.payouts.transferToPersonalWallet({
			amount: "10",
			currency: "USDT",
		});
		console.log("Personal wallet transfer:", personalTransfer);

		// Transfer to business wallet
		const businessTransfer = await client.payouts.transferToBusinessWallet({
			amount: "10",
			currency: "USDT",
		});
		console.log("Business wallet transfer:", businessTransfer);

		// Test other services
		console.log("\n=== Testing Other Services ===");

		// Get exchange rates
		const exchangeRates =
			await client.other.getExchangeRatesForCurrency("USDT");
		console.log("Exchange rates for USDT:", exchangeRates);
	} catch (error) {
		console.error("Error:", error);
	}
}

// Run the test if this file is executed directly
if (require.main === module) {
	test().catch(console.error);
}
