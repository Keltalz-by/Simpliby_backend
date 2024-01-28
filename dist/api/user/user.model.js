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
exports.User = exports.privateFields = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const argon2_1 = __importDefault(require("argon2"));
const utils_1 = require("../../utils");
exports.privateFields = ['__v', 'password', 'createdAt', 'updatedAt'];
let User = class User {
    async validatePassword(candidatePassword) {
        try {
            return await argon2_1.default.verify(this.password, candidatePassword);
        }
        catch (err) {
            throw new utils_1.AppError(400, 'Could not validate password');
        }
    }
};
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: '+234' }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'location' }),
    __metadata("design:type", String)
], User.prototype, "location", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'buyer' }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isSeller", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'what do you do?' }),
    __metadata("design:type", String)
], User.prototype, "occupation", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], User.prototype, "followings", void 0);
User = __decorate([
    (0, typegoose_1.pre)('save', async function (next) {
        this.id = this._id;
        if (!this.isModified('password')) {
            return;
        }
        const hash = await argon2_1.default.hash(this.password);
        this.password = hash;
        next();
    }),
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: 'users',
            timestamps: true
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW
        }
    })
], User);
exports.User = User;
const UserModel = (0, typegoose_1.getModelForClass)(User);
exports.default = UserModel;
//# sourceMappingURL=user.model.js.map