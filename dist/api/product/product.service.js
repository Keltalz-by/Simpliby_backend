"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const utils_1 = require("../../utils");
const category_model_1 = __importDefault(require("../category/category.model"));
const store_model_1 = __importDefault(require("../store/store.model"));
const product_model_1 = __importDefault(require("./product.model"));
const mongoose_1 = require("mongoose");
// type QueryObj = Record<string, string
class ProductService {
    async createProduct(productData) {
        const category = await category_model_1.default.findOne({ _id: productData.categoryId });
        const store = await store_model_1.default.findOne({ _id: productData.storeId });
        if (category === null) {
            throw new utils_1.AppError(404, 'Category does not exist');
        }
        if (store === null) {
            throw new utils_1.AppError(404, 'Store does not exist');
        }
        return await (await (await product_model_1.default.create(productData)).populate('categoryId', 'categoryName')).populate('storeId', 'businessName');
    }
    async getAllProducts(query) {
        var _a, _b;
        const page = (_a = parseInt(query.page) * 1) !== null && _a !== void 0 ? _a : 1;
        const limit = (_b = parseInt(query.limit) * 1) !== null && _b !== void 0 ? _b : 6;
        const skip = (page - 1) * limit;
        const products = await product_model_1.default.find().limit(limit).skip(skip);
        return products;
        // const features = (await (await new APIFeatures(ProductModel, query).filter()).sort()).limitFields()
    }
    async getAllProductsInCategory() {
        const products = await product_model_1.default.find();
        return products;
    }
    async totalProductsNumber() {
        return await product_model_1.default.countDocuments();
    }
    async getSingleProduct(productId) {
        if (!mongoose_1.Types.ObjectId.isValid(productId)) {
            throw new utils_1.AppError(400, 'Invalid product id');
        }
        const product = await product_model_1.default.findOne({ _id: productId });
        if (product === null) {
            throw new utils_1.AppError(404, 'Product does not exist');
        }
        return product;
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map