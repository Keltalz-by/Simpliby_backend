/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { type Routes } from '@src/common';
import { deserializeUser, restrictUser, validateResource } from '../../middlewares';
import { CategoryController } from './category.controller';
import { createCategorySchema } from './category.schema';

export class CategoryRoute implements Routes {
  public path = '/category/';
  public router = Router();
  public category = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.category.getAllCategory);
    this.router.get(`${this.path}:categoryId/products`, this.category.getAllProductsInCategory);
    this.router.use(deserializeUser, restrictUser('seller'));
    this.router.post(`${this.path}create`, validateResource(createCategorySchema), this.category.createCategory);
  }
}
