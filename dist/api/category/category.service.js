"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const utils_1 = require("../../utils");
const product_model_1 = __importDefault(require("../product/product.model"));
const category_model_1 = __importDefault(require("./category.model"));
const store_model_1 = __importDefault(require("../store/store.model"));
class CategoryService {
    async createCategory(categoryData) {
        if (!mongoose_1.default.Types.ObjectId.isValid(categoryData.storeId)) {
            throw new utils_1.AppError(400, 'Invalid store ID.');
        }
        const store = await store_model_1.default.findOne({ _id: categoryData.storeId });
        if (store === null) {
            throw new utils_1.AppError(404, 'Store not found.');
        }
        const category = await category_model_1.default.findOne({ categoryName: categoryData.categoryName });
        if (category !== null) {
            throw new utils_1.AppError(409, 'Category already exist.');
        }
        return await category_model_1.default.create(categoryData);
    }
    async getAllCategoriesOfStore(storeId) {
        if (!mongoose_1.default.Types.ObjectId.isValid(storeId)) {
            throw new utils_1.AppError(400, 'Invalid store ID.');
        }
        const store = await store_model_1.default.findOne({ _id: storeId });
        if (store === null) {
            throw new utils_1.AppError(404, 'Store not found.');
        }
        return await category_model_1.default.find({ storeId }).populate('storeId', 'businessName');
    }
    async getProductsInCategory(categoryId, storeId) {
        if (!mongoose_1.Types.ObjectId.isValid(categoryId)) {
            throw new utils_1.AppError(400, 'Invalid category id');
        }
        if (!mongoose_1.Types.ObjectId.isValid(storeId)) {
            throw new utils_1.AppError(400, 'Invalid store id');
        }
        const category = await category_model_1.default.findOne({ _id: categoryId });
        if (category === null) {
            throw new utils_1.AppError(404, 'Category does not exist');
        }
        const store = await store_model_1.default.findOne({ _id: storeId });
        if (store === null) {
            throw new utils_1.AppError(404, 'Store not found.');
        }
        const products = await product_model_1.default.find({ categoryId, storeId }).populate('categoryId', 'categoryName');
        if (products.length === 0) {
            throw new utils_1.AppError(404, 'No Products found in category');
        }
        return products;
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map