"use strict";
/* eslint-disable @typescript-eslint/no-misused-promises */
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
exports.paymentRoute = (0, express_1.Router)();
const path = '/payments';
const payment = new payment_controller_1.PaymentController();
exports.paymentRoute.post(`${path}/webhook`, payment.confirmOrderPayment);
//# sourceMappingURL=payment.route.js.map