"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileSchema = void 0;
const zod_1 = require("zod");
exports.updateProfileSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        location: (0, zod_1.string)().optional(),
        phone: (0, zod_1.string)().optional(),
        occupation: (0, zod_1.string)().optional()
    })
});
//# sourceMappingURL=user.schema.js.map