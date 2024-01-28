"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const lodash_1 = __importDefault(require("lodash"));
const utils_1 = require("../../utils");
const auth_service_1 = require("./auth.service");
const user_service_1 = require("../user/user.service");
const otp_service_1 = require("../otp/otp.service");
const user_model_1 = require("../user/user.model");
const logout = (res) => {
    res.cookie('accessToken', '', { maxAge: 1 });
    res.cookie('refreshToken', '', { maxAge: 1 });
    res.cookie('loggedIn', false, { maxAge: 1 });
};
class AuthController {
    constructor() {
        this.authService = new auth_service_1.AuthService();
        this.userService = new user_service_1.UserService();
        this.otpService = new otp_service_1.OTPService();
        this.registerUser = async (req, res, next) => {
            try {
                const userData = req.body;
                const user = await this.authService.signup(userData);
                res.status(201).json({
                    success: true,
                    message: 'User created successfully. Check your email for verification code',
                    data: user._id
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.loginUser = async (req, res, next) => {
            try {
                const userData = req.body;
                const user = await this.authService.login(userData);
                (0, utils_1.createToken)(res, JSON.stringify(user._id));
                const data = lodash_1.default.omit(user.toJSON(), user_model_1.privateFields);
                res.status(200).json({ success: true, message: 'User logged in successfully', data });
            }
            catch (error) {
                next(error);
            }
        };
        this.logoutUser = async (_req, res, next) => {
            try {
                logout(res);
                res.status(200).json({ success: true, message: 'User logged out successfully' });
            }
            catch (err) {
                next(err);
            }
        };
        this.verifyEmail = async (req, res, next) => {
            try {
                const { userId, otp } = req.body;
                await this.authService.verifyEmail(userId, otp);
                res.status(200).json({ success: true, message: 'User verified successfully.' });
            }
            catch (error) {
                next(error);
            }
        };
        this.refreshAccessToken = async (req, res, next) => {
            try {
                const refreshToken = req.cookies.refreshToken;
                const accessToken = await this.authService.refreshAccessToken(refreshToken);
                res.cookie('accessToken', accessToken, utils_1.accessTokenCookieOptions);
                res.cookie('loggedIn', true, utils_1.accessTokenCookieOptions);
                res.status(200).json({ success: true, message: 'Access token refreshed successfully' });
            }
            catch (err) {
                next(err);
            }
        };
        this.resendOtp = async (req, res, next) => {
            try {
                const { userId, email } = req.body;
                await this.authService.resendOtp(userId, email);
                res.status(200).json({ success: true, message: 'OTP resent successfully. Check your email for the new OTP.' });
            }
            catch (err) {
                next(err);
            }
        };
        this.forgotPassword = async (req, res, next) => {
            try {
                const { email } = req.body;
                const { user, newOtp } = await this.authService.forgotPassword(email);
                const message = (0, utils_1.requestPasswordTemplate)(user.name, newOtp);
                await (0, utils_1.sendMail)(email, 'Request for Password Reset', message);
                res.status(200).json({ success: true, message: 'Check your email for reset OTP' });
            }
            catch (error) {
                next(error);
            }
        };
        this.resetPassword = async (req, res, next) => {
            try {
                const { userId, password } = req.body;
                await this.authService.resetPassword(userId, password);
                res.status(200).json({ success: true, message: 'Password reset successful. Procees to login.' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map