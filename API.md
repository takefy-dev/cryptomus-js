# API Documentation

## Table of Contents

- [Client Configuration](#client-configuration)
- [Payments API](#payments-api)
- [Payouts API](#payouts-api)
- [Other Services](#other-services)

## Client Configuration

Initialize the client with your Cryptomus credentials:

```typescript
import { CryptomusClient } from "cryptomus-js";

const client = new CryptomusClient({
  merchantId: "your-merchant-id",
  paymentKey: "your-payment-key",
  payoutKey: "your-payout-key",
});
```

## Payments API

### Create Payment

Create a new payment request.

```typescript
const payment = await client.payments.create({
  amount: string | number;
  currency: string;
  order_id: string;
  network?: string;
  url_callback?: string;
  url_return?: string;
  url_success?: string;
  is_payment_multiple?: "true" | "false";
  lifetime?: number;
  to_currency?: string;
  subtract?: number;
  accuracy_payment_percent?: number;
  additional_data?: string;
  currencies?: Currency[];
  except_currencies?: Currency[];
  course_source?: string;
  from_referral_code?: string;
  discount_percent?: number;
  is_refresh?: "true" | "false";
});
```

Response type: `Payment`

### Get Payment Info

Get information about an existing payment.

```typescript
const info = await client.payments.getInfo({
  uuid: string;
  order_id: string;
});
```

Response type: `Payment`

### List Payment Services

Get a list of available payment services.

```typescript
const services = await client.payments.listServices();
```

Response type: `ListServicesResponse`

### Get Payment History

Get payment history within a date range.

```typescript
const history = await client.payments.getHistory({
  date_from?: string;
  date_to?: string;
});
```

Response type: `GetPaymentsHistoryResponse`

### Create Wallet

Create a new wallet for receiving payments.

```typescript
const wallet = await client.payments.createWallet({
  currency: string;
  network: string;
  order_id: string;
  url_callback?: string;
  from_referral_code?: string;
});
```

Response type: `CreateWalletResponse`

### Create QR Code for Wallet

Generate a QR code for a wallet.

```typescript
const qr = await client.payments.createQrCodeForWallet({
  wallet_address_uuid: string;
});
```

Response type: `CreateQrCodeForWalletResponse`

### Manage Discounts

List and set discounts for payment methods.

```typescript
// List discounts
const discounts = await client.payments.listDiscounts();

// Set discount
const result = await client.payments.setDiscount({
  currency: string;
  network: string;
  discount_percent: number;
});
```

Response types: `ListDiscountsResponse`, `SetDiscountForPaymentMethodResponse`

## Payouts API

### Create Payout

Create a new payout request.

```typescript
const payout = await client.payouts.create({
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
});
```

Response type: `Payout`

### Get Payout Info

Get information about an existing payout.

```typescript
const info = await client.payouts.getInfo({
  uuid: string;
  order_id: string;
});
```

Response type: `Payout`

### List Payout Services

Get a list of available payout services.

```typescript
const services = await client.payouts.listServices();
```

Response type: `ListServicesResponse`

### Get Payout History

Get payout history within a date range.

```typescript
const history = await client.payouts.getHistory({
  date_from?: string;
  date_to?: string;
});
```

Response type: `GetPayoutHistoryResponse`

### Wallet Transfers

Transfer funds between wallets.

```typescript
// Transfer to personal wallet
const personalTransfer = await client.payouts.transferToPersonalWallet({
  amount: string;
  currency: string;
});

// Transfer to business wallet
const businessTransfer = await client.payouts.transferToBusinessWallet({
  amount: string;
  currency: string;
});
```

Response types: `TransferToPersonalWalletResponse`, `TransferToBusinessWalletResponse`

## Other Services

### Get Exchange Rates

Get exchange rates for a specific currency.

```typescript
const rates = await client.other.getExchangeRatesForCurrency(currency: string);
```

Response type: `GetExchangeRatesForCurrencyResponse`

## Response Types

For detailed type definitions, see the TypeScript type declarations in the source code:

- [Payment Types](./src/types/payments.ts)
- [Payout Types](./src/types/payouts.ts)
- [Common Types](./src/types/common.ts)
- [Other Types](./src/types/other.ts)
