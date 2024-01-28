"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const mongoose_1 = require("mongoose");
const nanoid_1 = require("nanoid");
const payment_model_1 = __importDefault(require("./payment.model"));
const utils_1 = require("../../utils");
const order_model_1 = __importDefault(require("../order/order.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
class PaymentService {
    async makePayment(email, orderId) {
        const nanoid = (0, nanoid_1.customAlphabet)('abcdefghijklmnopqrstuvwxyz0123456789', 10);
        if (!mongoose_1.Types.ObjectId.isValid(orderId)) {
            throw new utils_1.AppError(400, 'Invalid order ID');
        }
        const order = await order_model_1.default.findOne({ _id: orderId });
        if (order === null) {
            throw new utils_1.AppError(404, 'Order not found');
        }
        const user = await user_model_1.default.findOne({ _id: order.owner });
        if (user === null) {
            throw new utils_1.AppError(404, 'User not found');
        }
        if (user.email !== email) {
            throw new utils_1.AppError(403, 'You can only pay for your order');
        }
        if (order.totalPrice < 2500) {
            const fee = 0.015 * order.totalPrice;
            const result = await (0, utils_1.makePayment)({
                email,
                amount: String((order.totalPrice + fee) * 100),
                reference: `Pay-${nanoid()}`
            });
            await payment_model_1.default.create({
                owner: order.owner,
                order: order._id,
                bill: order.totalPrice + fee,
                reference: result.reference
            });
            return {
                authorizationUrl: result.authorizationUrl,
                reference: result.reference,
                charges: fee
            };
        }
        const fee = 0.015 * order.totalPrice + 100;
        const feeCap = 2000;
        if (fee > feeCap) {
            const result = await (0, utils_1.makePayment)({
                email,
                amount: String((order.totalPrice + feeCap) * 100),
                reference: `Pay-${nanoid()}`
            });
            await payment_model_1.default.create({
                owner: order.owner,
                order: order._id,
                bill: order.totalPrice + feeCap,
                reference: result.reference
            });
            return {
                authorizationUrl: result.authorizationUrl,
                reference: result.reference,
                charges: feeCap
            };
        }
        const result = await (0, utils_1.makePayment)({
            email,
            amount: String((order.totalPrice + fee) * 100),
            reference: `Pay-${nanoid()}`
        });
        await payment_model_1.default.create({
            owner: order.owner,
            order: order._id,
            bill: order.totalPrice + fee,
            reference: result.reference
        });
        return { authorizationUrl: result.authorizationUrl, reference: result.reference, charges: fee };
    }
    async confirmPayment(orderId) {
        if (!mongoose_1.Types.ObjectId.isValid(orderId)) {
            throw new utils_1.AppError(400, 'Invalid order ID');
        }
        const order = await order_model_1.default.findOne({ _id: orderId });
        if (order === null) {
            throw new utils_1.AppError(404, 'Order not found');
        }
    }
}
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map