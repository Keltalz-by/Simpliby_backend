/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
// import { type Routes } from '../../common';
import { StoreController } from './store.controller';
import { multerErrorHandler, validateResource, deserializeUser, requireUser, restrictUser } from '../../middlewares';
import { createStoreSchema, searchStoreSchema } from './store.schema';
import { upload } from '../../utils';
import { OrderController } from '../order/order.controller';
import { createOrderSchema } from '../order/order.schema';
import { UserController } from '../user/user.controller';

export const storeRoute = Router();
const path = '/stores';
const order = new OrderController();
const user = new UserController();
const store = new StoreController();

storeRoute.post(
  `${path}`,
  deserializeUser,
  requireUser,
  [
    upload.fields([
      { name: 'storeImage', maxCount: 1 },
      { name: 'logo', maxCount: 1 }
    ]),
    multerErrorHandler
  ],
  validateResource(createStoreSchema),
  store.createStore
);
storeRoute.get(`${path}/orders`, deserializeUser, requireUser, restrictUser('seller'), order.storeOrders);
storeRoute.get(`${path}/orders/:orderId`, deserializeUser, requireUser, restrictUser('seller'), order.singleStoreOrder);
storeRoute.patch(
  `${path}/update`,
  deserializeUser,
  requireUser,
  restrictUser('seller'),
  [
    upload.fields([
      { name: 'storeImage', maxCount: 2 },
      { name: 'logo', maxCount: 1 }
    ]),
    multerErrorHandler
  ],
  store.updateStore
);

storeRoute.patch(`${path}/:storeId`, deserializeUser, requireUser, restrictUser('admin'), store.verifyStore);

storeRoute.post(
  `${path}/:storeId/orders`,
  deserializeUser,
  requireUser,
  restrictUser('user'),
  validateResource(createOrderSchema),
  order.createOrder
);
storeRoute.patch(`${path}/:storeId/follow`, deserializeUser, requireUser, restrictUser('user'), user.followStore);
storeRoute.patch(`${path}/:storeId/unfollow`, deserializeUser, requireUser, restrictUser('user'), user.unfollowStore);
storeRoute.post(`${path}/search`, deserializeUser, requireUser, validateResource(searchStoreSchema), store.searchStore);
