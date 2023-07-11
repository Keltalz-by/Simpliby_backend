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

// storeRoute.use(deserializeUser, requireUser, restrictUser('seller'));
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

// export class StoreRoute implements Routes {
//   public path = '/stores/';
//   public router = Router();
//   public store = new StoreController();
//   public order = new OrderController();
//   public user = new UserController();

//   constructor() {
//     this.initializeRoutes();
//   }

//   private initializeRoutes() {
//     this.router.use(deserializeUser, requireUser, restrictUser('seller'));

// this.router.post(
//   `${this.path}`,
//   [
//     upload.fields([
//       { name: 'storeImage', maxCount: 1 },
//       { name: 'logo', maxCount: 1 }
//     ]),
//     multerErrorHandler
//   ],
//   validateResource(createStoreSchema),
//   this.store.createStore
// );
//     this.router.get(`${this.path}orders`, this.order.storeOrders);
//     this.router.get(`${this.path}orders/:orderId`, restrictUser('seller'), this.order.singleStoreOrder);
// this.router.patch(
//   `${this.path}update`,
//   restrictUser('seller'),
//   [
//     upload.fields([
//       { name: 'storeImage', maxCount: 2 },
//       { name: 'logo', maxCount: 1 }
//     ]),
//     multerErrorHandler
//   ],
//   this.store.updateStore
// );

//     this.router.patch(`${this.path}:storeId`, restrictUser('admin'), this.store.verifyStore);

//     // this.router.use(restrictUser('user'));
// this.router.post(
//   `${this.path}:storeId/orders`,
//   restrictUser('user'),
//   validateResource(createOrderSchema),
//   this.order.createOrder
// );
// this.router.patch(`${this.path}:storeId/follow`, restrictUser('user'), this.user.followStore);
// this.router.patch(`${this.path}:storeId/unfollow`, restrictUser('user'), this.user.unfollowStore);

//     this.router.get(`${this.path}:storeId`, this.store.findStore);
//     this.router.get(`${this.path}`, this.store.findAllStores);
//     this.router.post(`${this.path}search`, validateResource(searchStoreSchema), this.store.searchStore);
//   }
// }
