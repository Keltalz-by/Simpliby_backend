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
import { CategoryController } from '../category/category.controller';

export const storeRoute = Router();
const path = '/stores';
const order = new OrderController();
const user = new UserController();
const store = new StoreController();
const category = new CategoryController();

storeRoute.post(
  `${path}`,

  deserializeUser,
  requireUser,
  restrictUser('buyer'),
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
      { name: 'storeImage', maxCount: 1 },
      { name: 'logo', maxCount: 1 }
    ]),
    multerErrorHandler
  ],
  store.updateStore
);

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
storeRoute.get(`${path}`, deserializeUser, requireUser, store.findAllStores);
storeRoute.get(`${path}/:storeId`, deserializeUser, requireUser, store.findStore);
storeRoute.get(`${path}/:storeId/categories`, deserializeUser, requireUser, category.getAllStoreCategories);
storeRoute.get(
  `${path}/:storeId/categories/:categoryId/products`,
  deserializeUser,
  requireUser,
  category.getAllProductsInCategory
);
