"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const middlewares_1 = require("../../middlewares");
const auth_schema_1 = require("./auth.schema");
const otp_schema_1 = require("../otp/otp.schema");
exports.authRoute = (0, express_1.Router)();
const path = '/auth';
const auth = new auth_controller_1.AuthController();
exports.authRoute.post(`${path}/register`, (0, middlewares_1.validateResource)(auth_schema_1.registerSchema), auth.registerUser);
exports.authRoute.post(`${path}/verify`, (0, middlewares_1.validateResource)(otp_schema_1.verifySchema), auth.verifyEmail);
exports.authRoute.post(`${path}/login`, (0, middlewares_1.validateResource)(auth_schema_1.loginSchema), auth.loginUser);
exports.authRoute.post(`${path}/resendotp`, (0, middlewares_1.validateResource)(otp_schema_1.resendOTPSchema), auth.resendOtp);
exports.authRoute.get(`${path}/refresh`, auth.refreshAccessToken);
exports.authRoute.post(`${path}/forgotpassword`, (0, middlewares_1.validateResource)(auth_schema_1.forgotPasswordSchema), auth.forgotPassword);
exports.authRoute.patch(`${path}/resetpassword`, (0, middlewares_1.validateResource)(auth_schema_1.resetPasswordSchema), auth.resetPassword);
exports.authRoute.get(`${path}/logout`, middlewares_1.deserializeUser, middlewares_1.requireUser, auth.logoutUser);
//# sourceMappingURL=auth.route.js.map