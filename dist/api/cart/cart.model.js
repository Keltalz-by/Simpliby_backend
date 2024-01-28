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
exports.Cart = void 0;
const typegoose_1 = require("@typegoose/typegoose");
let CartItem = class CartItem {
};
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], CartItem.prototype, "product", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 1, min: 1 }),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], CartItem.prototype, "price", void 0);
CartItem = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: 'cart',
            timestamps: true
        }
    })
], CartItem);
class Cart {
}
__decorate([
    (0, typegoose_1.prop)({ ref: 'User', type: () => String, required: true }),
    __metadata("design:type", Object)
], Cart.prototype, "owner", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Array)
], Cart.prototype, "items", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Cart.prototype, "totalPrice", void 0);
exports.Cart = Cart;
const CartModel = (0, typegoose_1.getModelForClass)(Cart);
exports.default = CartModel;
//# sourceMappingURL=cart.model.js.map