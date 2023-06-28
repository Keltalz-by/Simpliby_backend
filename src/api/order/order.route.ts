/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { type Routes } from '../../common';
import { deserializeUser, validateResource } from '../../middlewares';
import { OrderController } from './order.controller';
import { createOrderSchema } from './order.schema';
import { PaymentController } from '../payment/payment.controller';
import { WalletController } from '../wallet/wallet.controller';

export class OrderRoute implements Routes {
  public path = '/orders/';
  public router = Router();
  public order = new OrderController();
  public payment = new PaymentController();
  public wallet = new WalletController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(deserializeUser);
    this.router.post(`${this.path}`, validateResource(createOrderSchema), this.order.createOrder);
    this.router.get(`${this.path}`, this.order.getAllOrders);
    this.router.get(`${this.path}myorders`, this.order.userOrders);
    this.router.get(`${this.path}:orderId`, this.order.singleOrder);
    this.router.get(`${this.path}:orderId/productIds`, this.wallet.addToWallet);
    this.router.post(`${this.path}:orderId/pay`, this.payment.initiatePayment);
    this.router.patch(`${this.path}:orderId`, this.order.updateOrderStatus);
    this.router.delete(`${this.path}:orderId`, this.order.deleteUserOrder);
    // this.router.get(`${this.path}:categoryId/products`, this.category.getAllProductsInCategory);
    // this.router.post(`${this.path}create`, this.category.createCategory);
  }
}
