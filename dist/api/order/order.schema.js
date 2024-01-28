"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderPaymentRequest = exports.createOrderSchema = void 0;
const zod_1 = require("zod");
exports.createOrderSchema = (0, zod_1.object)({
    params: (0, zod_1.object)({
        storeId: (0, zod_1.string)({
            required_error: 'Store ID is required'
        })
    }),
    body: (0, zod_1.object)({
        productId: (0, zod_1.string)({
            required_error: 'Product ID is required'
        }),
        quantity: (0, zod_1.number)({
            required_error: 'Quantity of product is required'
        })
    })
});
exports.orderPaymentRequest = (0, zod_1.object)({
    params: (0, zod_1.object)({
        orderId: (0, zod_1.string)({
            required_error: 'Order ID is required'
        })
    })
});
//# sourceMappingURL=order.schema.js.map