"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
function test() {
    return __awaiter(this, void 0, void 0, function () {
        var client, payment, paymentInfo, paymentServices, paymentHistory, discounts, setDiscountResult, wallet, walletQr, payout, payoutInfo, payoutServices, payoutHistory, personalTransfer, businessTransfer, exchangeRates, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new index_1.CryptomusClient({
                        merchantId: process.env.MERCHANT_ID || "",
                        paymentKey: process.env.PAYMENT_KEY || "",
                        payoutKey: process.env.PAYOUT_KEY || "",
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 17, , 18]);
                    // Test payment methods
                    console.log("\n=== Testing Payment Methods ===");
                    return [4 /*yield*/, client.payments.create({
                            amount: "100",
                            currency: "USD",
                            order_id: "test-".concat(Date.now()),
                            url_callback: "https://Your-site.com/webhook",
                            url_return: "https://Your-site.com/success",
                            url_success: "https://Your-site.com/success",
                            is_payment_multiple: false,
                            lifetime: 3600,
                            currencies: [
                                { currency: "USDT", network: "TRX" },
                                { currency: "BTC", network: "BTC" },
                            ],
                        })];
                case 2:
                    payment = _a.sent();
                    console.log("Created payment:", payment);
                    return [4 /*yield*/, client.payments.getInfo({
                            uuid: payment.uuid,
                            order_id: payment.order_id,
                        })];
                case 3:
                    paymentInfo = _a.sent();
                    console.log("Payment info:", paymentInfo);
                    return [4 /*yield*/, client.payments.listServices()];
                case 4:
                    paymentServices = _a.sent();
                    console.log("Available payment services:", paymentServices);
                    return [4 /*yield*/, client.payments.getHistory({
                            date_from: new Date(Date.now() - 24 * 60 * 60 * 1000).toLocaleString("sv").replace("T", " "), // Last 24 hours
                            date_to: new Date().toLocaleString("sv").replace("T", " "),
                        })];
                case 5:
                    paymentHistory = _a.sent();
                    console.log("Payment history:", paymentHistory);
                    // Test discounts
                    console.log("\n=== Testing Discount Methods ===");
                    return [4 /*yield*/, client.payments.listDiscounts()];
                case 6:
                    discounts = _a.sent();
                    console.log("Current discounts:", discounts);
                    return [4 /*yield*/, client.payments.setDiscount({
                            currency: paymentServices[0].currency,
                            network: paymentServices[0].network,
                            discount_percent: 5,
                        })];
                case 7:
                    setDiscountResult = _a.sent();
                    console.log("Set discount result:", setDiscountResult);
                    // Test wallet methods
                    console.log("\n=== Testing Wallet Methods ===");
                    return [4 /*yield*/, client.payments.createWallet({
                            currency: paymentServices[0].currency,
                            network: paymentServices[0].network,
                            order_id: "wallet-".concat(Date.now()),
                        })];
                case 8:
                    wallet = _a.sent();
                    console.log("Created wallet:", wallet);
                    return [4 /*yield*/, client.payments.createQrCodeForWallet({
                            wallet_address_uuid: wallet.wallet_uuid,
                        })];
                case 9:
                    walletQr = _a.sent();
                    console.log("Wallet QR code:", walletQr);
                    // Test payout methods
                    console.log("\n=== Testing Payout Methods ===");
                    return [4 /*yield*/, client.payouts.create({
                            amount: "50",
                            currency: "USDT",
                            network: "TRX",
                            address: "your-wallet-address",
                            order_id: "payout-".concat(Date.now()),
                            is_subtract: false,
                        })];
                case 10:
                    payout = _a.sent();
                    console.log("Created payout:", payout);
                    return [4 /*yield*/, client.payouts.getInfo({
                            uuid: payout.uuid,
                            order_id: "payout-".concat(Date.now()),
                        })];
                case 11:
                    payoutInfo = _a.sent();
                    console.log("Payout info:", payoutInfo);
                    return [4 /*yield*/, client.payouts.listServices()];
                case 12:
                    payoutServices = _a.sent();
                    console.log("Available payout services:", payoutServices);
                    return [4 /*yield*/, client.payouts.getHistory({
                            date_from: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Last 24 hours
                            date_to: new Date().toISOString(),
                        })];
                case 13:
                    payoutHistory = _a.sent();
                    console.log("Payout history:", payoutHistory);
                    // Test wallet transfers
                    console.log("\n=== Testing Wallet Transfers ===");
                    return [4 /*yield*/, client.payouts.transferToPersonalWallet({
                            amount: "10",
                            currency: "USDT",
                        })];
                case 14:
                    personalTransfer = _a.sent();
                    console.log("Personal wallet transfer:", personalTransfer);
                    return [4 /*yield*/, client.payouts.transferToBusinessWallet({
                            amount: "10",
                            currency: "USDT",
                        })];
                case 15:
                    businessTransfer = _a.sent();
                    console.log("Business wallet transfer:", businessTransfer);
                    // Test other services
                    console.log("\n=== Testing Other Services ===");
                    return [4 /*yield*/, client.other.getExchangeRatesForCurrency("USDT")];
                case 16:
                    exchangeRates = _a.sent();
                    console.log("Exchange rates for USDT:", exchangeRates);
                    return [3 /*break*/, 18];
                case 17:
                    error_1 = _a.sent();
                    console.error("Error:", error_1);
                    return [3 /*break*/, 18];
                case 18: return [2 /*return*/];
            }
        });
    });
}
// Run the test if this file is executed directly
// if (require.main === module) {
test().catch(console.error);
// }
