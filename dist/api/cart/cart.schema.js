"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartSchema = void 0;
const zod_1 = require("zod");
exports.addToCartSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        productId: (0, zod_1.string)({
            required_error: 'Product ID is required'
        }),
        quantity: (0, zod_1.number)({
            required_error: 'Product quantity is required'
        })
    })
});
//# sourceMappingURL=cart.schema.js.map