"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateResource = void 0;
const zod_1 = require("zod");
const validateResource = (schema) => (req, res, next) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return res.status(400).json({
                success: false,
                message: err.issues[0].message
            });
        }
        next(err);
    }
};
exports.validateResource = validateResource;
//# sourceMappingURL=validate.middleware.js.map