/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { deserializeUser, requireUser, restrictUser, validateResource } from '../../middlewares';
import { OrderController } from './order.controller';
import { createOrderSchema } from './order.schema';
import { PaymentController } from '../payment/payment.controller';

export const orderRoute = Router();
const path = '/orders';
const order = new OrderController();
const payment = new PaymentController();

orderRoute.post(
  `${path}`,
  deserializeUser,
  requireUser,
  restrictUser('user'),
  validateResource(createOrderSchema),
  order.createOrder
);
orderRoute.get(`${path}/:orderId/pay`, deserializeUser, requireUser, restrictUser('user'), payment.orderPayment);
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
