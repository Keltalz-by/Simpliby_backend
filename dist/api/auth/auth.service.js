"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
const mongoose = __importStar(require("mongoose"));
const config_1 = require("../../config");
const user_model_1 = __importDefault(require("../user/user.model"));
const utils_1 = require("../../utils");
const otp_model_1 = __importDefault(require("../otp/otp.model"));
const user_service_1 = require("../user/user.service");
class AuthService {
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    async signup(userData) {
        const user = await user_model_1.default.findOne({ email: userData.email });
        if (user !== null) {
            throw new utils_1.AppError(409, `User ${user.email} already exist`);
        }
        const newOtp = (0, utils_1.createOtp)();
        let tokenExpiration = new Date();
        tokenExpiration = tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 20);
        const newUser = await user_model_1.default.create(userData);
        await otp_model_1.default.create({
            owner: newUser._id,
            code: newOtp,
            expiration: tokenExpiration,
            type: 'Email Verification'
        });
        await (0, utils_1.sendOtpVerificationMail)(newUser.name, newUser.email, newOtp);
        return newUser;
    }
    async login(userData) {
        const user = await user_model_1.default.findOne({ email: userData.email });
        if (user === null) {
            throw new utils_1.AppError(400, 'Invalid email or password');
        }
        const isValidPassword = await user.validatePassword(userData.password);
        if (!isValidPassword) {
            throw new utils_1.AppError(400, 'Invalid email or password');
        }
        if (!user.isEmailVerified) {
            throw new utils_1.AppError(400, 'Please verify your email');
        }
        return user;
    }
    async verifyEmail(userId, otp) {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new utils_1.AppError(400, 'Invalid user ID.');
        }
        const otpRecord = await otp_model_1.default.findOne({ owner: userId });
        const user = await user_model_1.default.findOne({ _id: userId });
        if (otpRecord === null) {
            throw new utils_1.AppError(400, 'User does not exists or user has been verified or OTP has expired');
        }
        if (otpRecord.expiration < new Date(Date.now())) {
            await otp_model_1.default.deleteOne({ owner: userId });
            throw new utils_1.AppError(400, 'OTP is expired. Request for another one.');
        }
        const isOtpValid = await otpRecord.validateOTP(otp);
        if (!isOtpValid) {
            throw new utils_1.AppError(400, 'Invalid OTP.');
        }
        if (otpRecord.type === 'Email Verification') {
            await user_model_1.default.updateOne({ _id: userId }, { $set: { isEmailVerified: true } });
            const message = (0, utils_1.emailVerifiedTemplate)(user === null || user === void 0 ? void 0 : user.name);
            await otp_model_1.default.deleteOne({ owner: userId });
            return await (0, utils_1.sendMail)(user === null || user === void 0 ? void 0 : user.email, 'Email Verification Successful', message);
        }
        else if (otpRecord.type === 'Password Verification') {
            await user_model_1.default.updateOne({ _id: userId }, { $set: { password: '' } });
            const message = (0, utils_1.emailVerifiedPasswordTemplate)(user === null || user === void 0 ? void 0 : user.name);
            await otp_model_1.default.deleteOne({ owner: userId });
            return await (0, utils_1.sendMail)(user === null || user === void 0 ? void 0 : user.email, 'Email Verification Successful', message);
        }
        else {
            throw new utils_1.AppError(400, 'Invalid OTP Type.');
        }
    }
    async refreshAccessToken(refreshToken) {
        const decoded = (0, utils_1.verifyJwt)(refreshToken, config_1.REFRESH_TOKEN_PUBLIC_KEY);
        if (decoded === null) {
            throw new utils_1.AppError(403, 'Could not refresh access token');
        }
        const user = await this.userService.findUser({ _id: JSON.parse(decoded.userId) });
        if (user === null) {
            throw new utils_1.AppError(401, 'User not logged in');
        }
        const newAccessToken = (0, utils_1.signJwt)({ userId: JSON.stringify(user._id) }, config_1.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: config_1.ACCESS_TOKEN_EXPIRESIN
        });
        return newAccessToken;
    }
    async resendOtp(userId, email) {
        const user = await user_model_1.default.findOne({ email });
        if (user !== null && String(user._id) === userId) {
            if (user.isEmailVerified) {
                throw new utils_1.AppError(400, 'User already verified');
            }
            await otp_model_1.default.deleteOne({ owner: userId });
            const newOtp = (0, utils_1.createOtp)();
            let tokenExpiration = new Date();
            tokenExpiration = tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 20);
            await otp_model_1.default.create({ owner: userId, code: newOtp, expiration: tokenExpiration, type: 'Email Verification' });
            return await (0, utils_1.sendOtpVerificationMail)(user.name, user.email, newOtp);
        }
        throw new utils_1.AppError(404, 'User not found');
    }
    async forgotPassword(email) {
        const user = await user_model_1.default.findOne({ email });
        if (user === null) {
            throw new utils_1.AppError(404, 'User does not exist');
        }
        if (!user.isEmailVerified) {
            throw new utils_1.AppError(400, 'User not verified. Check your email for verification code or request for a new code.');
        }
        const newOtp = (0, utils_1.createOtp)();
        let tokenExpiration = new Date();
        tokenExpiration = tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 20);
        await otp_model_1.default.create({
            owner: user._id,
            code: newOtp,
            expiration: tokenExpiration,
            type: 'Password Verification'
        });
        return { user, newOtp };
    }
    async resetPassword(userId, password) {
        const user = await user_model_1.default.findOne({ _id: userId });
        if (user !== null) {
            console.log(user);
            user.password = password;
            await user.save();
            const message = (0, utils_1.passwordResetCompleteTemplate)(user.name);
            return await (0, utils_1.sendMail)(user.email, 'Password Reset Successful', message);
        }
        throw new utils_1.AppError(404, 'User does not exist');
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map