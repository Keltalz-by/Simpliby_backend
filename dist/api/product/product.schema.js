"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        storeId: (0, zod_1.string)({
            required_error: 'Store is required'
        }),
        categoryId: (0, zod_1.string)({
            required_error: 'Product category is required'
        }),
        productName: (0, zod_1.string)({
            required_error: 'Product name is required'
        }),
        description: (0, zod_1.string)({
            required_error: 'Product description is required'
        }),
        price: (0, zod_1.string)({
            required_error: 'Price is required'
        }),
        reservationPrice: (0, zod_1.string)({
            required_error: 'Reservation price is required'
        }),
        currency: (0, zod_1.string)().optional(),
        itemLocation: (0, zod_1.string)().optional(),
        inStock: (0, zod_1.string)().optional(),
        productImages: (0, zod_1.any)({
            required_error: "Product Images are required"
        }),
        productRackImage: (0, zod_1.any)().optional()
    })
};
exports.createProductSchema = (0, zod_1.object)(Object.assign({}, payload));
//# sourceMappingURL=product.schema.js.map