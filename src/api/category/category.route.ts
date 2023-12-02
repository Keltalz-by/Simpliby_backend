/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { deserializeUser, restrictUser, validateResource, requireUser } from '../../middlewares';
import { CategoryController } from './category.controller';
import { createCategorySchema } from './category.schema';

export const categoryRoute = Router();
const path = '/categories';
const category = new CategoryController();

// categoryRoute.get(`${path}`, category.getAllCategory);
categoryRoute.get(`${path}/:categoryId/products`, category.getAllProductsInCategory);
categoryRoute.post(
  `${path}`,
  deserializeUser,
  requireUser,
  restrictUser('seller'),
  validateResource(createCategorySchema),
  category.createCategory
);
