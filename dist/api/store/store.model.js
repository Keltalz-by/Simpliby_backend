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
exports.Store = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const user_model_1 = require("../user/user.model");
let Store = class Store {
};
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Store.prototype, "id", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => user_model_1.User, required: true }),
    __metadata("design:type", Object)
], Store.prototype, "owner", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Store.prototype, "businessName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Store.prototype, "businessLocation", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Store.prototype, "phone", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Store.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Store.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Store.prototype, "city", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'Nigeria' }),
    __metadata("design:type", String)
], Store.prototype, "country", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Object)
], Store.prototype, "storeImage", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Object)
], Store.prototype, "logo", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Store.prototype, "website", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Store.prototype, "businessHours", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], Store.prototype, "followers", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: false }),
    __metadata("design:type", Boolean)
], Store.prototype, "isStoreVerified", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0 }),
    __metadata("design:type", Number)
], Store.prototype, "amountSold", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], Store.prototype, "buyersVisited", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: [] }),
    __metadata("design:type", Array)
], Store.prototype, "numberOfTimesVisited", void 0);
Store = __decorate([
    (0, typegoose_1.pre)('save', function (next) {
        this.id = this._id;
        next();
    }),
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: 'stores',
            timestamps: true
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW
        }
    })
], Store);
exports.Store = Store;
const StoreModel = (0, typegoose_1.getModelForClass)(Store);
exports.default = StoreModel;
//# sourceMappingURL=store.model.js.map