"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToBuySchema = void 0;
const zod_1 = require("zod");
exports.createToBuySchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        title: (0, zod_1.string)({
            required_error: 'Title is required'
        }),
        isCompleted: (0, zod_1.boolean)().optional()
    }).array()
});
//# sourceMappingURL=toBuy.schema.js.map