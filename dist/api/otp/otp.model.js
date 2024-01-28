"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP = void 0;
const utils_1 = require("../../utils");
const typegoose_1 = require("@typegoose/typegoose");
const argon2_1 = __importDefault(require("argon2"));
const user_model_1 = require("../user/user.model");
var Type;
(function (Type) {
    Type["EmailVerification"] = "Email Verification";
    Type["PasswordVerification"] = "Password Verification";
})(Type || (Type = {}));
let OTP = class OTP {
    async validateOTP(code) {
        try {
            return await argon2_1.default.verify(this.code, code);
        }
        catch (err) {
            throw new utils_1.AppError(400, 'Could not validate otp');
        }
    }
};
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_model_1.User }),
    __metadata("design:type", Object)
], OTP.prototype, "owner", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], OTP.prototype, "code", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: null }),
    __metadata("design:type", Date)
], OTP.prototype, "expiration", void 0);
__decorate([
    (0, typegoose_1.prop)({ enum: Type }),
    __metadata("design:type", String)
], OTP.prototype, "type", void 0);
OTP = __decorate([
    (0, typegoose_1.pre)('save', async function () {
        if (!this.isModified('code')) {
            return;
        }
        const hash = await argon2_1.default.hash(this.code);
        this.code = hash;
    }),
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: 'otp',
            timestamps: true
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW
        }
    })
], OTP);
exports.OTP = OTP;
const OTPModel = (0, typegoose_1.getModelForClass)(OTP);
exports.default = OTPModel;
//# sourceMappingURL=otp.model.js.map