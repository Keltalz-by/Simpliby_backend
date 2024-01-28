"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        storeId: (0, zod_1.string)({
            required_error: 'Store ID is required'
        }),
        categoryName: (0, zod_1.string)({
            required_error: 'Category name is required'
        })
    })
});
//# sourceMappingURL=category.schema.js.map