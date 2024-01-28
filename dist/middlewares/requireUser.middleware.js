"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireUser = void 0;
// import { AppError } from '../utils';
const utils_1 = require("../utils");
const requireUser = (_req, res, next) => {
    try {
        const user = res.locals.user;
        if (user === null) {
            next(new utils_1.AppError(401, 'Invalid token or session expired'));
            return;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.requireUser = requireUser;
//# sourceMappingURL=requireUser.middleware.js.map