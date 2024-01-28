"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const crypto_1 = __importDefault(require("crypto"));
const payment_service_1 = require("./payment.service");
const order_service_1 = require("../order/order.service");
const utils_1 = require("../../utils");
const user_service_1 = require("../user/user.service");
const config_1 = require("../../config");
class PaymentController {
    constructor() {
        this.paymentService = new payment_service_1.PaymentService();
        this.orderService = new order_service_1.OrderService();
        this.userService = new user_service_1.UserService();
        this.orderPayment = async (req, res, next) => {
            try {
                const { orderId } = req.params;
                const userId = res.locals.user._id;
                const user = await this.userService.findUser({ _id: userId });
                if (user === null) {
                    next(new utils_1.AppError(404, 'User does not exist'));
                    return;
                }
                const { authorizationUrl, charges } = await this.paymentService.makePayment(user.email, orderId);
                res.status(200).json({
                    success: true,
                    message: 'Payment initiated successfully',
                    data: { authorizationUrl, charges }
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.confirmOrderPayment = async (req, res, next) => {
            try {
                // const { orderId } = req.params;
                const secret = config_1.PAYSTACK_SECRET_KEY;
                const hash = crypto_1.default.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');
                if (hash === req.headers['x-paystack-signature']) {
                    const event = req.body;
                    if (event.length !== 0 && event.event === 'charge.success') {
                        console.log(event.data.id);
                        return res.status(200).json({ status: 'success', message: 'Transfer successful' });
                    }
                }
                res.send(200);
            }
            catch (error) {
                next(error);
            }
            // throw new AppError(400, 'You cannot make such request');
        };
    }
}
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map