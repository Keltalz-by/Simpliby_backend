// /* eslint-disable @typescript-eslint/no-misused-promises */
// import { Router } from 'express';
// import { type Routes } from '../../common';
// import { deserializeUser, requireUser, restrictUser, validateResource } from '../../middlewares';
// import { OrderController } from './order.controller';
// import { createOrderSchema } from './order.schema';
// import { PaymentController } from '../payment/payment.controller';

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
//     this.router.post(`${this.path}`, validateResource(createOrderSchema), this.order.createOrder);
//     this.router.post(`${this.path}:orderId/pay`, this.payment.orderPayment);
//     // this.router.get(`${this.path}`, this.order.getAllOrders);
//     // this.router.get(`${this.path}myorders`, this.order.userOrders);
//     // this.router.get(`${this.path}:orderId`, this.order.userOrders);
//     this.router.patch(`${this.path}:orderId`, this.order.updateOrderStatus);
//     // this.router.get(`${this.path}:categoryId/products`, this.category.getAllProductsInCategory);
//     // this.router.post(`${this.path}create`, this.category.createCategory);
//   }
// }
