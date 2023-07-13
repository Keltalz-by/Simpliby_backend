/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { CartController } from './cart.controller';
import { deserializeUser, requireUser, restrictUser, validateResource } from '../../middlewares';
import { addToCartSchema } from './cart.schema';

export const cartRoute = Router();
const path = '/cart';
const cart = new CartController();

cartRoute.post(
  `${path}`,
  deserializeUser,
  requireUser,
  restrictUser('user'),
  validateResource(addToCartSchema),
  cart.AddProductToCart
);
cartRoute.get(`${path}`, deserializeUser, requireUser, restrictUser('user'), cart.getUserCart);
cartRoute.patch(`${path}/:productId`, deserializeUser, requireUser, restrictUser('user'), cart.deleteProductfromCart);
cartRoute.delete(`${path}`, deserializeUser, requireUser, restrictUser('user'), cart.deleteUserCart);
