"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const store_service_1 = require("../store/store.service");
const utils_1 = require("../../utils");
class ProductController {
    constructor() {
        this.productService = new product_service_1.ProductService();
        this.storeService = new store_service_1.StoreService();
        this.createProduct = async (req, res, next) => {
            try {
                const productData = req.body;
                const allImages = req.files;
                productData.productImages = [];
                for (const key of Object.keys(allImages)) {
                    if (key === 'productImages') {
                        // @ts-expect-error not really an error
                        for (const file of allImages[key]) {
                            const path = file.path;
                            const images = await (0, utils_1.uploadToCloudinary)(path, 'Product-Images');
                            productData.productImages.push(images);
                        }
                    }
                    if (key === 'productRackImage') {
                        // @ts-expect-error not really an error
                        for (const file of allImages[key]) {
                            const path = file.path;
                            const image = await (0, utils_1.uploadToCloudinary)(path, 'Product-Rack-Images');
                            productData.productRackImage = image;
                        }
                    }
                }
                const product = await this.productService.createProduct(productData);
                res.status(201).json({ message: 'Product created successfully', success: true, data: product });
            }
            catch (err) {
                next(err);
            }
        };
        this.getAllCategoryProducts = async (_req, res, next) => {
            try {
                const products = await this.productService.getAllProductsInCategory();
                res.status(200).json({ count: products.length, success: true, data: products });
            }
            catch (err) {
                next(err);
            }
        };
        this.getAllProducts = async (req, res, next) => {
            try {
                const { page, limit } = req.query;
                const products = await this.productService.getAllProducts({ page, limit });
                res.status(200).json({ success: true, data: products, count: products.length });
            }
            catch (err) {
                next(err);
            }
        };
        this.getSingleProduct = async (req, res, next) => {
            try {
                const { productId } = req.params;
                const product = await this.productService.getSingleProduct(productId);
                res.status(200).json({ success: true, data: product });
            }
            catch (err) {
                next(err);
            }
        };
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map