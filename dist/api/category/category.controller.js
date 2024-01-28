"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const utils_1 = require("../../utils");
const category_service_1 = require("./category.service");
class CategoryController {
    constructor() {
        this.categoryService = new category_service_1.CategoryService();
        this.createCategory = async (req, res, next) => {
            try {
                const categoryData = req.body;
                const category = await this.categoryService.createCategory(categoryData);
                res.status(201).json({ data: category });
            }
            catch (err) {
                if (err.code === 11000) {
                    next(new utils_1.AppError(409, 'Category already exist'));
                    return;
                }
                next(err);
            }
        };
        this.getAllStoreCategories = async (req, res, next) => {
            try {
                const { storeId } = req.params;
                const categories = await this.categoryService.getAllCategoriesOfStore(storeId);
                res.status(200).json({ success: true, data: categories });
            }
            catch (err) {
                next(err);
            }
        };
        this.getAllProductsInCategory = async (req, res, next) => {
            try {
                const { categoryId, storeId } = req.params;
                const products = await this.categoryService.getProductsInCategory(categoryId, storeId);
                res.status(200).json({ success: true, data: products });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.CategoryController = CategoryController;
//# sourceMappingURL=category.controller.js.map