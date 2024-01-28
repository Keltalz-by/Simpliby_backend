"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRoute = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
const middlewares_1 = require("../../middlewares");
const cart_schema_1 = require("./cart.schema");
exports.cartRoute = (0, express_1.Router)();
const path = '/cart';
const cart = new cart_controller_1.CartController();
exports.cartRoute.post(`${path}`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('user'), (0, middlewares_1.validateResource)(cart_schema_1.addToCartSchema), cart.AddProductToCart);
exports.cartRoute.get(`${path}`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('user'), cart.getUserCart);
exports.cartRoute.patch(`${path}/:productId`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('user'), cart.deleteProductfromCart);
exports.cartRoute.delete(`${path}`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('user'), cart.deleteUserCart);
//# sourceMappingURL=cart.route.js.map