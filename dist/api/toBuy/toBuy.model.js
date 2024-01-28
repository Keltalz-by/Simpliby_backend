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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToBuy = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const user_model_1 = require("../user/user.model");
let ToBuy = class ToBuy {
};
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_model_1.User, required: true }),
    __metadata("design:type", Object)
], ToBuy.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], ToBuy.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], ToBuy.prototype, "isCompleted", void 0);
ToBuy = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: 'tobuy',
            timestamps: true
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW
        }
    })
], ToBuy);
exports.ToBuy = ToBuy;
const ToBuyModel = (0, typegoose_1.getModelForClass)(ToBuy);
exports.default = ToBuyModel;
//# sourceMappingURL=toBuy.model.js.map