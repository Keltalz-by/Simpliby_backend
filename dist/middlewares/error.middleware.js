"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = exports.NotFoundError = void 0;
const utils_1 = require("../utils");
const NotFoundError = (req, res, next) => {
    const err = new utils_1.AppError(404, `Not Found - ${req.originalUrl}`);
    res.status(404);
    next(err);
};
exports.NotFoundError = NotFoundError;
const ErrorHandler = (err, req, res, next) => {
    var _a, _b;
    try {
        let status = (_a = err.status) !== null && _a !== void 0 ? _a : 500;
        let message = (_b = err.message) !== null && _b !== void 0 ? _b : 'Something went wrong';
        utils_1.logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        if (err.name === 'CastError') {
            status = 404;
            message = 'Resource not found';
        }
        res
            .status(status)
            .json({ success: false, message, stack: process.env.NODE_ENV === 'production' ? null : err.stack });
    }
    catch (err) {
        next(err);
    }
};
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=error.middleware.js.map