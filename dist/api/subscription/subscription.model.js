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
exports.Subscription = void 0;
const typegoose_1 = require("@typegoose/typegoose");
var Plan;
(function (Plan) {
    Plan["Free"] = "FREE";
    Plan["Basic"] = "BASIC";
    Plan["Pro"] = "PRO";
})(Plan || (Plan = {}));
let Subscription = class Subscription {
};
__decorate([
    (0, typegoose_1.prop)({ ref: 'Store', type: () => String, required: true }),
    __metadata("design:type", Object)
], Subscription.prototype, "storeId", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: Plan.Free, enum: Plan }),
    __metadata("design:type", String)
], Subscription.prototype, "plan", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Subscription.prototype, "reference", void 0);
Subscription = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: 'subscriptions',
            timestamps: true
        }
    })
], Subscription);
exports.Subscription = Subscription;
const SubscriptionModel = (0, typegoose_1.getModelForClass)(Subscription);
exports.default = SubscriptionModel;
//# sourceMappingURL=subscription.model.js.map