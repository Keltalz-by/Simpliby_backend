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
exports.ResetToken = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const argon2_1 = __importDefault(require("argon2"));
const utils_1 = require("../../utils");
const user_model_1 = require("../user/user.model");
let ResetToken = class ResetToken {
    async validateToken(token) {
        try {
            return await argon2_1.default.verify(this.token, token);
        }
        catch (err) {
            throw new utils_1.AppError(400, 'Could not validate token');
        }
    }
};
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_model_1.User }),
    __metadata("design:type", Object)
], ResetToken.prototype, "owner", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], ResetToken.prototype, "token", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Date)
], ResetToken.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Date)
], ResetToken.prototype, "expiresAt", void 0);
ResetToken = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: 'reset-token'
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW
        }
    })
], ResetToken);
exports.ResetToken = ResetToken;
const ResetTokenModel = (0, typegoose_1.getModelForClass)(ResetToken);
exports.default = ResetTokenModel;
//# sourceMappingURL=resetToken.model.js.map