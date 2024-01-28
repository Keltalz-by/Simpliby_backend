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
exports.Category = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const store_model_1 = require("../store/store.model");
let Category = class Category {
};
__decorate([
    (0, typegoose_1.prop)({ ref: () => store_model_1.Store, required: true }),
    __metadata("design:type", Object)
], Category.prototype, "storeId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], Category.prototype, "categoryName", void 0);
Category = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: 'category',
            timestamps: true
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW
        }
    })
], Category);
exports.Category = Category;
const CategoryModel = (0, typegoose_1.getModelForClass)(Category);
exports.default = CategoryModel;
//# sourceMappingURL=category.model.js.map