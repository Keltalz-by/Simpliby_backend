"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeUser = void 0;
const utils_1 = require("../utils");
const config_1 = require("../config");
// import { AuthService } from '../api/auth/auth.service';
const user_service_1 = require("../api/user/user.service");
// const authService = new AuthService();
const userService = new user_service_1.UserService();
const deserializeUser = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (accessToken === undefined) {
            next(new utils_1.AppError(401, 'You are not logged in'));
            return;
        }
        const decoded = (0, utils_1.verifyJwt)(accessToken, config_1.ACCESS_TOKEN_PUBLIC_KEY);
        if (decoded !== null) {
            const user = await userService.findUser({ _id: JSON.parse(decoded.userId) });
            if (user !== null) {
                res.locals.user = user;
                next();
            }
            else {
                next(new utils_1.AppError(401, 'User session has expired'));
                return;
            }
        }
        else {
            next(new utils_1.AppError(401, 'Invalid access token'));
        }
    }
    catch (err) {
        next(err);
    }
};
exports.deserializeUser = deserializeUser;
//# sourceMappingURL=deserializeUser.middleware.js.map