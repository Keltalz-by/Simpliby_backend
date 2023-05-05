// /* eslint-disable @typescript-eslint/no-misused-promises */
// import { Router } from 'express';
// import { type Routes } from '../../common';
// import { deserializeUser, requireUser, validateResource } from '../../middlewares';
// import { OrderController } from './order.controller';
// import { createOrderSchema } from './order.schema';

// export class OrderRoute implements Routes {
//   public path = '/orders/';
//   public router = Router();
//   public order = new OrderController();

//   constructor() {
//     this.initializeRoutes();
//   }

//   private initializeRoutes() {
//     this.router.use(deserializeUser, requireUser);
//     this.router.post(`${this.path}`, validateResource(createOrderSchema), this.order.createOrder);
//     this.router.get(`${this.path}`, this.order.getAllOrders);
//     this.router.get(`${this.path}myorders`, this.order.userOrders);
//     this.router.get(`${this.path}:orderId`, this.order.singleOrder);
//     this.router.delete(`${this.path}:orderId`, this.order.deleteUserOrder);
//     // this.router.get(`${this.path}:categoryId/products`, this.category.getAllProductsInCategory);
//     // this.router.post(`${this.path}create`, this.category.createCategory);
//   }
// }
