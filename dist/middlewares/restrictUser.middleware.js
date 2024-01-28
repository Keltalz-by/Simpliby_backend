"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictUser = void 0;
const utils_1 = require("../utils");
const restrictUser = (...allowedRoles) => (_req, res, next) => {
    const user = res.locals.user;
    if (!allowedRoles.includes(user.role)) {
        throw new utils_1.AppError(403, 'You are not allowed to perform this action');
    }
    next();
};
exports.restrictUser = restrictUser;
//# sourceMappingURL=restrictUser.middleware.js.map