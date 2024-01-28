"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoute = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const middlewares_1 = require("../../middlewares");
const category_controller_1 = require("./category.controller");
const category_schema_1 = require("./category.schema");
exports.categoryRoute = (0, express_1.Router)();
const path = '/categories';
const category = new category_controller_1.CategoryController();
// categoryRoute.get(`${path}`, category.getAllCategory);
exports.categoryRoute.get(`${path}/:categoryId/products`, category.getAllProductsInCategory);
exports.categoryRoute.post(`${path}`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('seller'), (0, middlewares_1.validateResource)(category_schema_1.createCategorySchema), category.createCategory);
//# sourceMappingURL=category.route.js.map