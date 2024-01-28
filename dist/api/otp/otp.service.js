"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPService = void 0;
// import { ObjectId } from 'mongoose'
const otp_model_1 = __importDefault(require("../otp/otp.model"));
class OTPService {
    async createOTP(code, owner) {
        return await otp_model_1.default.create({ owner, code, createdAt: Date.now(), expiresAt: Date.now() + 5 * 60 * 1000 });
    }
    async findOTP(userId) {
        return await otp_model_1.default.findOne({ owner: userId });
    }
    async deleteOTP(userId) {
        return await otp_model_1.default.deleteOne({ owner: userId });
    }
}
exports.OTPService = OTPService;
//# sourceMappingURL=otp.service.js.map