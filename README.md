# Cryptomus JS

![License](https://img.shields.io/badge/license-MIT-green)
![Maintenance](https://img.shields.io/badge/maintained-yes-brightgreen)
![Contributions](https://img.shields.io/badge/contributions-welcome-orange)
[![GitHub issues](https://img.shields.io/github/issues/0xjord4n/cryptomus-js)](https://github.com/0xjord4n/cryptomus-js/issues)
[![GitHub stars](https://img.shields.io/github/stars/0xjord4n/cryptomus-js)](https://github.com/0xjord4n/cryptomus-js/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/0xjord4n/cryptomus-js)](https://github.com/0xjord4n/cryptomus-js/network)
[![npm version](https://img.shields.io/npm/v/cryptomus-js.svg?style=flat-square)](https://www.npmjs.org/package/cryptomus-js)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=cryptomus-js&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=cryptomus-js)
[![npm downloads](https://img.shields.io/npm/dm/cryptomus-js.svg?style=flat-square)](https://npm-stat.com/charts.html?package=cryptomus-js)

A TypeScript SDK for the [Cryptomus](https://cryptomus.com/) payment system API. Provides a clean and type-safe interface for integrating cryptocurrency payments and payouts into your application.

## Features

- 🔒 Full TypeScript support with comprehensive types
- 💳 Complete payments API implementation
- 💸 Complete payouts API implementation
- 🔄 Exchange rates and other utility endpoints
- ⚡ Built with Bun for maximum performance
- 🧪 Comprehensive test suite
- 📚 Detailed API documentation
- 🔐 Secure request signing
- 🌐 Cross-platform support

## Installation

```bash
# Using npm
npm install cryptomus-js

# Using yarn
yarn add cryptomus-js

# Using pnpm
pnpm add cryptomus-js

# Using bun
bun add cryptomus-js
```

## Quick Start

```typescript
import { CryptomusClient } from "cryptomus-js";

// Initialize the client
const client = new CryptomusClient({
  merchantId: "your-merchant-id",
  paymentKey: "your-payment-key",
  payoutKey: "your-payout-key",
});

// Create a payment
const payment = await client.payments.create({
  amount: "100",
  currency: "USD",
  order_id: "test-123",
  url_callback: "https://your-callback-url.com/webhook",
});

console.log(payment);
```

## Common Workflows

### 1. Accept Cryptocurrency Payments

```typescript
// 1. Create a payment
const payment = await client.payments.create({
  amount: "100",
  currency: "USD",
  order_id: "order-123",
  url_callback: "https://your-domain.com/webhook",
  url_return: "https://your-domain.com/thank-you",
  is_payment_multiple: false,
  lifetime: 3600, // Payment window: 1 hour
});

// 2. Redirect user to payment page
const paymentUrl = payment.url;

// 3. Handle webhook notifications
app.post("/webhook", async (req, res) => {
  // Verify webhook signature
  const isValid = await client.payments.verifyWebhookSignature({
    ipAddress: req.ip,
    request: req.body,
  });

  if (!isValid) {
    return res.status(400).send("Invalid signature");
  }

  const status = req.body.status;
  const orderId = req.body.order_id;

  if (status === "paid") {
    // Payment successful - fulfill the order
    await fulfillOrder(orderId);
  }

  res.status(200).send("OK");
});
```

### 2. Create and Monitor a Static Wallet

```typescript
// 1. Create a static wallet for receiving payments
const wallet = await client.payments.createWallet({
  currency: "USDT",
  network: "TRX",
  order_id: "wallet-123",
  url_callback: "https://your-domain.com/wallet-webhook",
});

// 2. Generate QR code for the wallet
const qr = await client.payments.createQrCodeForWallet({
  wallet_address_uuid: wallet.wallet_uuid,
});

// 3. Handle wallet webhook notifications
app.post("/wallet-webhook", async (req, res) => {
  const isValid = await client.payments.verifyWebhookSignature({
    ipAddress: req.ip,
    request: req.body,
  });

  if (!isValid) {
    return res.status(400).send("Invalid signature");
  }

  const status = req.body.status;
  const amount = req.body.amount;

  if (status === "paid") {
    // Process the received payment
    await processWalletPayment(amount);
  }

  res.status(200).send("OK");
});
```

### 3. Process Cryptocurrency Payouts

```typescript
// 1. Check available payout services
const services = await client.payouts.listServices();
const usdtService = services.find(
  (s) => s.currency === "USDT" && s.network === "TRX",
);

if (!usdtService) {
  throw new Error("USDT-TRC20 payouts not available");
}

// 2. Create a payout with webhook
const payout = await client.payouts.create({
  amount: "1000",
  currency: "USDT",
  network: "TRX",
  address: "TRC20WalletAddress",
  order_id: "payout-123",
  is_subtract: false,
  url_callback: "https://your-domain.com/payout-webhook",
});

// 3. Handle payout webhook notifications
app.post("/payout-webhook", async (req, res) => {
  // Verify webhook signature
  const isValid = await client.payouts.verifyWebhookSignature({
    ipAddress: req.ip,
    request: req.body,
  });

  if (!isValid) {
    return res.status(400).send("Invalid signature");
  }

  const status = req.body.status;
  const payoutId = req.body.uuid;

  switch (status) {
    case "paid":
      // Payout successful
      await updatePayoutStatus(payoutId, "completed");
      break;
    case "failed":
      // Payout failed
      const error = req.body.error;
      await handlePayoutFailure(payoutId, error);
      break;
    case "process":
      // Payout in progress
      await updatePayoutStatus(payoutId, "processing");
      break;
  }

  res.status(200).send("OK");
});

// 4. Optional: Check payout status manually
const checkPayoutStatus = async (uuid: string) => {
  const info = await client.payouts.getInfo({ uuid });
  return info.status;
};
```

### 4. Implement Exchange Rate Updates

```typescript
// 1. Set up periodic rate updates
const updateExchangeRates = async () => {
  try {
    const rates = await client.other.getExchangeRatesForCurrency("USDT");

    // Update your application's rates
    await updateStoredRates(rates);

    // Schedule next update in 5 minutes
    setTimeout(updateExchangeRates, 5 * 60 * 1000);
  } catch (error) {
    console.error("Failed to update rates:", error);

    // Retry sooner on failure
    setTimeout(updateExchangeRates, 60 * 1000);
  }
};

// 2. Start the update cycle
updateExchangeRates();

// 3. Get current rate for a specific pair
const getCurrentRate = (
  rates: any[],
  fromCurrency: string,
  toCurrency: string,
) => {
  const rate = rates.find(
    (r) => r.currency_from === fromCurrency && r.currency_to === toCurrency,
  );

  return rate?.course || null;
};
```

## Usage

### Payments

```typescript
// Create a payment
const payment = await client.payments.create({
  amount: "100",
  currency: "USD",
  order_id: "test-123",
});

// Get payment info
const info = await client.payments.getInfo({
  uuid: payment.uuid,
  order_id: payment.order_id,
});

// List payment services
const services = await client.payments.listServices();

// Get payment history
const history = await client.payments.getHistory({
  date_from: "2025-01-01",
  date_to: "2025-02-01",
});

// Create a wallet
const wallet = await client.payments.createWallet({
  currency: "USDT",
  network: "TRX",
  order_id: "wallet-123",
});

// Create QR code for wallet
const qr = await client.payments.createQrCodeForWallet({
  wallet_address_uuid: wallet.wallet_uuid,
});
```

### Payouts

```typescript
// Create a payout
const payout = await client.payouts.create({
  amount: "50",
  currency: "USDT",
  network: "TRX",
  address: "wallet-address",
  order_id: "payout-123",
  is_subtract: false,
});

// Get payout info
const info = await client.payouts.getInfo({
  uuid: payout.uuid,
  order_id: "payout-123",
});

// List payout services
const services = await client.payouts.listServices();

// Get payout history
const history = await client.payouts.getHistory({
  date_from: "2025-01-01",
  date_to: "2025-02-01",
});

// Transfer to personal wallet
const transfer = await client.payouts.transferToPersonalWallet({
  amount: "10",
  currency: "USDT",
});
```

### Other Services

```typescript
// Get exchange rates
const rates = await client.other.getExchangeRatesForCurrency("USDT");
```

## Development

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0.0

### Setup

1. Clone the repository

```bash
git clone https://github.com/0xjord4n/cryptomus-js.git
cd cryptomus-js
```

2. Install dependencies

```bash
bun install
```

3. Run tests

```bash
# Run tests once
bun test

# Run tests in watch mode
bun test --watch
```

## API Documentation

For detailed API documentation, see [API.md](./API.md).

## Security

For security concerns, please read our [Security Policy](./SECURITY.md).

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
