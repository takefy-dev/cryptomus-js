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
exports.PayoutsService = void 0;
var base_1 = require("./base");
/**
 * Service class for handling payout-related operations in the Cryptomus API.
 * Provides methods for creating payouts, transferring funds, and managing payout history.
 */
var PayoutsService = /** @class */ (function (_super) {
    __extends(PayoutsService, _super);
    function PayoutsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates a new payout to a specified wallet address.
     *
     * @param {CreatePayoutRequest} data - Payout creation parameters including amount, currency, and destination.
     * @returns {Promise<CreatePayoutResponse>} A promise that resolves with the created payout details.
     * @throws {Error} If the payout creation fails or returns an error response.
     *
     * @example
     * ```typescript
     * const payout = await payouts.create({
     *   amount: "50",
     *   currency: "USDT",
     *   network: "TRX",
     *   address: "wallet-address",
     *   order_id: "payout123"
     * });
     * ```
     */
    PayoutsService.prototype.create = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/payout", "POST", data, false)];
            });
        });
    };
    /**
     * Retrieves information about a specific payout.
     *
     * @param {GetPayoutInfoRequest} data - Parameters to identify the payout (uuid or order_id).
     * @returns {Promise<GetPayoutInfoResponse>} A promise that resolves with the payout information.
     * @throws {Error} If the request fails or returns an error response.
     *
     * @example
     * ```typescript
     * const info = await payouts.getInfo({
     *   uuid: "payout-uuid"
     * });
     * ```
     */
    PayoutsService.prototype.getInfo = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/payout/info", "POST", data, false)];
            });
        });
    };
    /**
     * Retrieves a list of available payout services and their details.
     *
     * @returns {Promise<ListServicesResponse>} A promise that resolves with the list of payout services.
     * @throws {Error} If the request fails or returns an error response.
     *
     * @example
     * ```typescript
     * const services = await payouts.listServices();
     * ```
     */
    PayoutsService.prototype.listServices = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/payout/services", "POST", undefined, false)];
            });
        });
    };
    /**
     * Retrieves payout history based on specified date range and filters.
     *
     * @param {GetPayoutHistoryRequest} data - Parameters for filtering payout history.
     * @returns {Promise<GetPayoutHistoryResponse>} A promise that resolves with the payout history.
     * @throws {Error} If the request fails or returns an error response.
     *
     * @example
     * ```typescript
     * const history = await payouts.getHistory({
     *   date_from: "2025-01-01",
     *   date_to: "2025-02-01"
     * });
     * ```
     */
    PayoutsService.prototype.getHistory = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/payout/list", "POST", data, false)];
            });
        });
    };
    PayoutsService.prototype.verifyWebhookSignature = function (params) {
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
                    this.generateSign(request, false, true) !== request.sign) {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/, true];
            });
        });
    };
    /**
     * Transfers funds to a personal wallet.
     *
     * @param {TransferToPersonalWalletRequest} data - Parameters for the transfer operation.
     * @returns {Promise<TransferToPersonalWalletResponse>} A promise that resolves with the transfer details.
     * @throws {Error} If the transfer fails or returns an error response.
     *
     * @example
     * ```typescript
     * const transfer = await payouts.transferToPersonalWallet({
     *   amount: "10",
     *   currency: "USDT"
     * });
     * ```
     */
    PayoutsService.prototype.transferToPersonalWallet = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/payout/wallet", "POST", data, false)];
            });
        });
    };
    PayoutsService.prototype.transferToBusinessWallet = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request("/transfer/to-business", "POST", params, false)];
            });
        });
    };
    return PayoutsService;
}(base_1.BaseService));
exports.PayoutsService = PayoutsService;
