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
exports.Payment = void 0;
const typegoose_1 = require("@typegoose/typegoose");
var Status;
(function (Status) {
    Status["Pending"] = "Pending";
    Status["Success"] = "Success";
    Status["Failed"] = "Failed";
})(Status || (Status = {}));
let Payment = class Payment {
};
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Payment.prototype, "owner", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: 'Order', type: () => String, required: true }),
    __metadata("design:type", Object)
], Payment.prototype, "order", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], Payment.prototype, "bill", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Status.Pending, enum: Status }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Payment.prototype, "reference", void 0);
Payment = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: 'payments',
            timestamps: true
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW
        }
    })
], Payment);
exports.Payment = Payment;
const PaymentModel = (0, typegoose_1.getModelForClass)(Payment);
exports.default = PaymentModel;
//# sourceMappingURL=payment.model.js.map