"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const product_controller_1 = require("./product.controller");
const product_schema_1 = require("./product.schema");
const utils_1 = require("../../utils");
exports.productRoute = (0, express_1.Router)();
const path = '/products';
const product = new product_controller_1.ProductController();
exports.productRoute.get(`${path}`, middlewares_1.deserializeUser, middlewares_1.requireUser, product.getAllProducts);
exports.productRoute.get(`${path}/:productId`, middlewares_1.deserializeUser, middlewares_1.requireUser, product.getSingleProduct);
exports.productRoute.post(`${path}`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('seller'), [
    utils_1.upload.fields([
        { name: 'productImages', maxCount: 3 },
        { name: 'productRackImage', maxCount: 1 }
    ]),
    middlewares_1.multerErrorHandler
], (0, middlewares_1.validateResource)(product_schema_1.createProductSchema), product.createProduct);
//# sourceMappingURL=product.route.js.map