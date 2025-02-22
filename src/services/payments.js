"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.PaymentsService = void 0;
var base_1 = require("./base");
/**
 * Service class for handling payment-related operations in the Cryptomus API.
 * Provides methods for creating payments, managing wallets, and handling discounts.
 */
var PaymentsService = /** @class */ (function (_super) {
    __extends(PaymentsService, _super);
    function PaymentsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates a new payment in the Cryptomus system.
     *
     * @param {CreatePaymentRequest} data - Payment creation parameters including amount, currency, and order details.
     * @returns {Promise<CreatePaymentResponse>} A promise that resolves with the created payment details.
     * @throws {Error} If the payment creation fails or returns an error response.
     *
     * @example
     * ```typescript
     * const payment = await payments.create({
     *   amount: "100",
     *   currency: "USD",
     *   order_id: "order123"
     * });
     * ```
     */
    PaymentsService.prototype.create = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/payment", "POST", params)];
            });
        });
    };
    /**
     * Creates a new wallet for receiving payments.
     *
     * @param {CreateWalletRequest} data - Parameters for creating the wallet.
     * @returns {Promise<CreateWalletResponse>} A promise that resolves with the created wallet details.
     * @throws {Error} If the request fails or returns an error response.
     *
     * @example
     * ```typescript
     * const wallet = await payments.createWallet({
     *   currency: "USDT",
     *   network: "TRX",
     *   order_id: "wallet123"
     * });
     * ```
     */
    PaymentsService.prototype.createWallet = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/wallet", "POST", params)];
            });
        });
    };
    /**
     * Generates a QR code for a specific wallet address.
     *
     * @param {CreateQrCodeForWalletRequest} data - Parameters for generating the QR code.
     * @returns {Promise<CreateQrCodeForWalletResponse>} A promise that resolves with the QR code details.
     * @throws {Error} If the request fails or returns an error response.
     *
     * @example
     * ```typescript
     * const qr = await payments.createQrCodeForWallet({
     *   wallet_address_uuid: "wallet-uuid"
     * });
     * ```
     */
    PaymentsService.prototype.createQrCodeForWallet = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/wallet/qr", "POST", params)];
            });
        });
    };
    PaymentsService.prototype.createQrCodeForInvoice = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/payment/qr", "POST", params)];
            });
        });
    };
    PaymentsService.prototype.blockStaticWallet = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/wallet/block-address", "POST", params)];
            });
        });
    };
    PaymentsService.prototype.refundPaymentOnBlockedWallet = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/wallet/blocked-address-refund", "POST", params)];
            });
        });
    };
    /**
     * Retrieves information about a specific payment.
     *
     * @param {GetPaymentInfoRequest} data - Parameters to identify the payment (uuid or order_id).
     * @returns {Promise<GetPaymentInfoResponse>} A promise that resolves with the payment information.
     * @throws {Error} If the request fails or returns an error response.
     *
     * @example
     * ```typescript
     * const info = await payments.getInfo({
     *   uuid: "payment-uuid"
     * });
     * ```
     */
    PaymentsService.prototype.getInfo = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/payment/info", "POST", params)];
            });
        });
    };
    PaymentsService.prototype.refund = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/payment/refund", "POST", params)];
            });
        });
    };
    PaymentsService.prototype.resendWebhook = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/payment/resend", "POST", params)];
            });
        });
    };
    PaymentsService.prototype.testPaymentWebhook = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/test-webhook/payment", "POST", params)];
            });
        });
    };
    PaymentsService.prototype.testPayoutWebhook = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/test-webhook/payout", "POST", params)];
            });
        });
    };
    PaymentsService.prototype.testWalletWebhook = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/test-webhook/wallet", "POST", params)];
            });
        });
    };
    /**
     * Retrieves a list of available payment services and their details.
     *
     * @returns {Promise<ListServicesResponse>} A promise that resolves with the list of payment services.
     * @throws {Error} If the request fails or returns an error response.
     *
     * @example
     * ```typescript
     * const services = await payments.listServices();
     * ```
     */
    PaymentsService.prototype.listServices = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/payment/services", "POST")];
            });
        });
    };
    /**
     * Retrieves payment history based on specified date range and filters.
     *
     * @param {GetPaymentsHistoryRequest} data - Parameters for filtering payment history.
     * @returns {Promise<GetPaymentsHistoryResponse>} A promise that resolves with the payment history.
     * @throws {Error} If the request fails or returns an error response.
     *
     * @example
     * ```typescript
     * const history = await payments.getHistory({
     *   date_from: "2025-01-01",
     *   date_to: "2025-02-01"
     * });
     * ```
     */
    PaymentsService.prototype.getHistory = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/payment/list", "POST", params)];
            });
        });
    };
    PaymentsService.prototype.verifyWebhookSignature = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var ipAddress, request;
            return __generator(this, function (_a) {
                ipAddress = params.ipAddress, request = params.request;
                if (ipAddress &&
                    typeof ipAddress === "string" &&
                    ipAddress !== "91.227.144.54") {
                    return [2 /*return*/, false];
                }
                if (request.sign &&
                    typeof request.sign === "string" &&
                    this.generateSign(request, true, true) !== request.sign) {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * Retrieves a list of available discounts for payments.
     *
     * @returns {Promise<ListDiscountsResponse>} A promise that resolves with the list of discounts.
     * @throws {Error} If the request fails or returns an error response.
     *
     * @example
     * ```typescript
     * const discounts = await payments.listDiscounts();
     * ```
     */
    PaymentsService.prototype.listDiscounts = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/payment/discount/list", "POST", undefined, true)];
            });
        });
    };
    /**
     * Sets or updates a discount for payments.
     *
     * @param {SetDiscountForPaymentMethodRequest} data - Parameters for setting the discount.
     * @returns {Promise<SetDiscountForPaymentMethodResponse>} A promise that resolves with the updated discount details.
     * @throws {Error} If the request fails or returns an error response.
     *
     * @example
     * ```typescript
     * const discount = await payments.setDiscount({
     *   currency: "USDT",
     *   percent: 5
     * });
     * ```
     */
    PaymentsService.prototype.setDiscount = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/payment/discount/set", "POST", params, true)];
            });
        });
    };
    return PaymentsService;
}(base_1.BaseService));
exports.PaymentsService = PaymentsService;
