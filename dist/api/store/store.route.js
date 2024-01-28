"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeRoute = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
// import { type Routes } from '../../common';
const store_controller_1 = require("./store.controller");
const middlewares_1 = require("../../middlewares");
const store_schema_1 = require("./store.schema");
const utils_1 = require("../../utils");
const order_controller_1 = require("../order/order.controller");
const order_schema_1 = require("../order/order.schema");
const user_controller_1 = require("../user/user.controller");
const category_controller_1 = require("../category/category.controller");
exports.storeRoute = (0, express_1.Router)();
const path = '/stores';
const order = new order_controller_1.OrderController();
const user = new user_controller_1.UserController();
const store = new store_controller_1.StoreController();
const category = new category_controller_1.CategoryController();
exports.storeRoute.post(`${path}`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('buyer'), [
    utils_1.upload.fields([
        { name: 'storeImage', maxCount: 1 },
        { name: 'logo', maxCount: 1 }
    ]),
    middlewares_1.multerErrorHandler
], (0, middlewares_1.validateResource)(store_schema_1.createStoreSchema), store.createStore);
exports.storeRoute.get(`${path}/orders`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('seller'), order.storeOrders);
exports.storeRoute.get(`${path}/orders/:orderId`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('seller'), order.singleStoreOrder);
exports.storeRoute.patch(`${path}/update`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('seller'), [
    utils_1.upload.fields([
        { name: 'storeImage', maxCount: 1 },
        { name: 'logo', maxCount: 1 }
    ]),
    middlewares_1.multerErrorHandler
], store.updateStore);
exports.storeRoute.post(`${path}/:storeId/orders`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('user'), (0, middlewares_1.validateResource)(order_schema_1.createOrderSchema), order.createOrder);
exports.storeRoute.patch(`${path}/:storeId/follow`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('user'), user.followStore);
exports.storeRoute.patch(`${path}/:storeId/unfollow`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('user'), user.unfollowStore);
exports.storeRoute.post(`${path}/search`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.validateResource)(store_schema_1.searchStoreSchema), store.searchStore);
exports.storeRoute.get(`${path}`, middlewares_1.deserializeUser, middlewares_1.requireUser, store.findAllStores);
exports.storeRoute.get(`${path}/:storeId`, middlewares_1.deserializeUser, middlewares_1.requireUser, store.findStore);
exports.storeRoute.get(`${path}/:storeId/categories`, middlewares_1.deserializeUser, middlewares_1.requireUser, category.getAllStoreCategories);
exports.storeRoute.get(`${path}/:storeId/categories/:categoryId/products`, middlewares_1.deserializeUser, middlewares_1.requireUser, category.getAllProductsInCategory);
//# sourceMappingURL=store.route.js.map