/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { type Routes } from '../../common';
import { StoreController } from './store.controller';
import { multerErrorHandler, validateResource, deserializeUser, requireUser, restrictUser } from '../../middlewares';
import { createStoreSchema, searchStoreSchema, verifyStoreSchema } from './store.schema';
import { upload } from '../../utils';
import { OrderController } from '../order/order.controller';
import { createOrderSchema } from '../order/order.schema';

export class StoreRoute implements Routes {
  public path = '/stores/';
  public router = Router();
  public store = new StoreController();
  public order = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(deserializeUser, requireUser);
    this.router.post(
      `${this.path}`,
      [
        upload.fields([
          { name: 'storeImage', maxCount: 1 },
          { name: 'logo', maxCount: 1 }
        ]),
        multerErrorHandler
      ],
      validateResource(createStoreSchema),
      this.store.createStore
    );
    this.router.use(restrictUser('seller'));
    this.router.get(`${this.path}orders`, this.order.storeOrders);
    this.router.get(`${this.path}orders/:orderId`, this.order.singleStoreOrder);
    this.router.use(restrictUser('user'));
    this.router.post(`${this.path}:storeId/orders`, validateResource(createOrderSchema), this.order.createOrder);
    this.router.patch(`${this.path}:userId/follow`, this.store.followUser);
    this.router.use(restrictUser('admin'));
    this.router.patch(`${this.path}verifystore/:storeId`, validateResource(verifyStoreSchema), this.store.verifyStore);
    this.router.patch(`${this.path}:userId/unfollow`, this.store.unfollowUser);
    this.router.patch(
      `${this.path}update`,
      [
        upload.fields([
          { name: 'storeImage', maxCount: 2 },
          { name: 'logo', maxCount: 1 }
        ]),
        multerErrorHandler
      ],
      this.store.updateStore
    );
    this.router.get(`${this.path}:storeId`, this.store.findStore);
    this.router.get(`${this.path}`, this.store.findAllStores);
    this.router.post(`${this.path}search`, validateResource(searchStoreSchema), this.store.searchStore);
  }
}
