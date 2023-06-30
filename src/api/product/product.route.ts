/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { type Routes } from '@src/common';
import { deserializeUser, multerErrorHandler, requireUser, restrictUser, validateResource } from '../../middlewares';
import { ProductController } from './product.controller';
import { createProductSchema } from './product.schema';
import { upload } from '../../utils';

export class ProductRoute implements Routes {
  public path = '/products/';
  public router = Router();
  public product = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(deserializeUser, requireUser);
    this.router.get(`${this.path}`, this.product.getAllProducts);
    this.router.use(restrictUser('seller'));
    this.router.post(
      `${this.path}`,
      [
        upload.fields([
          { name: 'productImages', maxCount: 3 },
          { name: 'productRackImage', maxCount: 1 }
        ]),
        multerErrorHandler
      ],
      validateResource(createProductSchema),
      this.product.createProduct
    );
  }
}
