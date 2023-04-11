/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { type Routes } from '@src/common';
import { deserializeUser, requireUser, restrictUser, validateResource } from '../../middlewares';
import { ProductController } from './product.controller';
import { createProductSchema } from './product.schema';

export class ProductRoute implements Routes {
  public path = '/products/';
  public router = Router();
  public product = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(deserializeUser, requireUser, restrictUser('STORE'));
    this.router.post(`${this.path}`, validateResource(createProductSchema), this.product.createProduct);
  }
}
