/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { type Routes } from '@src/common';
import { StoreController } from './store.controller';
import { deserializeUser, requireUser, restrictUser, validateResource } from '../../middlewares';
import { storeRegisterSchema } from './store.schema';

export class StoreRoute implements Routes {
  public path = '/stores/';
  public router = Router();
  public store = new StoreController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}create`, validateResource(storeRegisterSchema), this.store.createStore);
    // this.router.post(`${this.path}verify`, validateResource(verifySchema), this.store.verifyStore);
    this.router.use(deserializeUser, requireUser, restrictUser('STORE'));
    this.router.patch(`${this.path}:storeId`, this.store.updateStore);
    this.router.get(`${this.path}:storeId`, this.store.findStore);
    this.router.get(`${this.path}`, this.store.findAllStores);
  }
}
