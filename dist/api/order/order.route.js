"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoute = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const order_controller_1 = require("./order.controller");
const order_schema_1 = require("./order.schema");
const payment_controller_1 = require("../payment/payment.controller");
exports.orderRoute = (0, express_1.Router)();
const path = '/orders';
const order = new order_controller_1.OrderController();
const payment = new payment_controller_1.PaymentController();
exports.orderRoute.post(`${path}`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('user'), (0, middlewares_1.validateResource)(order_schema_1.createOrderSchema), order.createOrder);
exports.orderRoute.get(`${path}/:orderId/pay`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('user'), payment.orderPayment);
// orderRoute.get(`${path}`, order.getAllOrders);
// export class OrderRoute implements Routes {
//   public path = '/orders/';
//   public router = Router();
//   public order = new OrderController();
//   public payment = new PaymentController();
//   constructor() {
//     this.initializeRoutes();
//   }
//   private initializeRoutes() {
//     this.router.use(deserializeUser, requireUser, restrictUser('user'));
//
//     // this.router.get(`${this.path}`, this.order.getAllOrders);
//     // this.router.get(`${this.path}myorders`, this.order.userOrders);
//     // this.router.get(`${this.path}:orderId`, this.order.userOrders);
//     this.router.patch(`${this.path}:orderId`, this.order.updateOrderStatus);
//     // this.router.get(`${this.path}:categoryId/products`, this.category.getAllProductsInCategory);
//     // this.router.post(`${this.path}create`, this.category.createCategory);
//   }
// }
//# sourceMappingURL=order.route.js.map