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
exports.Wallet = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let Wallet = class Wallet {
};
__decorate([
    (0, typegoose_1.prop)({ ref: 'Store', type: () => String, required: true }),
    __metadata("design:type", Object)
], Wallet.prototype, "storeId", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Wallet.prototype, "balance", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Wallet.prototype, "amountWithdrawn", void 0);
Wallet = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: 'wallets',
            timestamps: true
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW
        }
    })
], Wallet);
exports.Wallet = Wallet;
const WalletModel = (0, typegoose_1.getModelForClass)(Wallet);
exports.default = WalletModel;
//# sourceMappingURL=wallet.model.js.map