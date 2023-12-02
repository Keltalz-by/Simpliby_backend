/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { deserializeUser, multerErrorHandler, requireUser, restrictUser, validateResource } from '../../middlewares';
import { ProductController } from './product.controller';
import { createProductSchema } from './product.schema';
import { upload } from '../../utils';

export const productRoute = Router();
const path = '/products';
const product = new ProductController();

productRoute.get(`${path}`, deserializeUser, requireUser, product.getAllProducts);
productRoute.get(`${path}/:productId`, deserializeUser, requireUser, product.getSingleProduct);
productRoute.delete(`${path}/:productId`, deserializeUser, requireUser, restrictUser('seller'), product.deleteProduct);
productRoute.post(
  `${path}`,
  deserializeUser,
  requireUser,
  restrictUser('seller'),
  [
    upload.fields([
      { name: 'productImages', maxCount: 3 },
      { name: 'productRackImage', maxCount: 1 }
    ]),
    multerErrorHandler
  ],
  validateResource(createProductSchema),
  product.createProduct
);
