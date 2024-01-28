"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePayment = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const appError_1 = require("./appError");
const makePayment = async (data) => {
    try {
        const url = config_1.PAYSTACK_INITIALIZE_URL;
        const response = await axios_1.default.post(url, data, {
            headers: {
                Authorization: `Bearer ${config_1.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        return { authorizationUrl: response.data.data.authorization_url, reference: response.data.data.reference };
    }
    catch (error) {
        throw new appError_1.AppError(400, error.response.data.error);
    }
};
exports.makePayment = makePayment;
//# sourceMappingURL=pay.js.map