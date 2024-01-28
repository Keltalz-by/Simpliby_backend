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
exports.Order = void 0;
const typegoose_1 = require("@typegoose/typegoose");
var Status;
(function (Status) {
    Status["Pending"] = "Pending";
    Status["Paid"] = "Paid";
    Status["Reserved"] = "Reserved";
    Status["Processing"] = "Processing";
    Status["Dispatched"] = "Dispatched";
    Status["Cancelled"] = "Cancelled";
    Status["Delivered"] = "Delivered";
})(Status || (Status = {}));
let OrderItem = class OrderItem {
};
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], OrderItem.prototype, "productId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 1, min: 1 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
OrderItem = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: 'orders',
            timestamps: true
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW
        }
    })
], OrderItem);
class Order {
}
__decorate([
    (0, typegoose_1.prop)({ ref: 'User', type: () => String, required: true }),
    __metadata("design:type", Object)
], Order.prototype, "owner", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Status.Pending, enum: Status }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Order.prototype, "storeId", void 0);
exports.Order = Order;
const OrderModel = (0, typegoose_1.getModelForClass)(Order);
exports.default = OrderModel;
//# sourceMappingURL=order.model.js.map