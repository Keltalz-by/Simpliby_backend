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
exports.Product = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const category_model_1 = require("../category/category.model");
const store_model_1 = require("../store/store.model");
let Product = class Product {
};
__decorate([
    (0, typegoose_1.prop)({ ref: () => store_model_1.Store, required: true }),
    __metadata("design:type", Object)
], Product.prototype, "storeId", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => category_model_1.Category, required: true }),
    __metadata("design:type", Object)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "productName", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Product.prototype, "itemLocation", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 'NGN (Naira)' }),
    __metadata("design:type", String)
], Product.prototype, "currency", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: 0, required: true }),
    __metadata("design:type", String)
], Product.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Product.prototype, "reservationPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Array)
], Product.prototype, "productImages", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Object)
], Product.prototype, "productRackImage", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "inStock", void 0);
Product = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: 'products',
            timestamps: true
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW
        }
    })
], Product);
exports.Product = Product;
const ProductModel = (0, typegoose_1.getModelForClass)(Product);
exports.default = ProductModel;
//# sourceMappingURL=product.model.js.map