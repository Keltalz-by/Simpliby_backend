/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { type Routes } from '@src/common';
import { BuyerController } from './buyer.controller';
import { registerBuyerSchema } from './buyer.schema';
import { validateResource } from '../../middlewares';

export class BuyerRoute implements Routes {
  public path = '/buyers/';
  public router = Router();
  public buyer = new BuyerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}create`, validateResource(registerBuyerSchema), this.buyer.registerBuyer);
  }
}
