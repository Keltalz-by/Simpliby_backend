/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { type Routes } from '../../common';
import { CartController } from './cart.controller';
import { deserializeUser, requireUser, validateResource } from '../../middlewares';
import { addToCartSchema } from './cart.schema';

export class CartRoute implements Routes {
  public path = '/carts/';
  public router = Router();
  public cart = new CartController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(deserializeUser, requireUser);
    this.router.post(`${this.path}`, validateResource(addToCartSchema), this.cart.AddProductToCart);
    this.router.get(`${this.path}`, this.cart.getUserCart);
    this.router.delete(`${this.path}`, this.cart.deleteUserCart);
  }
}
