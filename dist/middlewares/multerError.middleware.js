"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerErrorHandler = void 0;
const utils_1 = require("../utils");
function multerErrorHandler(err, _req, _res, next) {
    if (err !== null) {
        if (err.message === 'Unexpected field') {
            next(new utils_1.AppError(400, 'Maximum image limit exceeded or wrong image field.'));
            return;
        }
        next(new utils_1.AppError(400, err.message));
        return;
    }
    next();
}
exports.multerErrorHandler = multerErrorHandler;
//# sourceMappingURL=multerError.middleware.js.map