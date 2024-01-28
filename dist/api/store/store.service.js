"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreService = void 0;
/* eslint-disable @typescript-eslint/restrict-plus-operands */
const mongoose = __importStar(require("mongoose"));
const utils_1 = require("../../utils");
const store_model_1 = __importDefault(require("../store/store.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
// import UserModel from '../user/user.model';
class StoreService {
    async createStore(storeInput, owner) {
        if (!mongoose.Types.ObjectId.isValid(owner)) {
            throw new utils_1.AppError(400, 'Invalid user ID.');
        }
        const user = await user_model_1.default.findOne({ _id: owner });
        const store = await store_model_1.default.findOne({ businessName: storeInput.businessName });
        if (user === null) {
            throw new utils_1.AppError(404, `User with ID ${owner} does not exist`);
        }
        if (user.isSeller) {
            throw new utils_1.AppError(400, `User already have a store`);
        }
        if (store !== null) {
            throw new utils_1.AppError(409, `Store with business name ${storeInput.businessName} already exist`);
        }
        await user_model_1.default.findByIdAndUpdate({ _id: owner }, {
            $set: { role: 'seller' }
        }, { new: true });
        const newStore = await (await store_model_1.default.create(storeInput)).populate('owner', 'name');
        await user.updateOne({ $set: { isSeller: true, role: 'seller' } });
        return newStore;
    }
    async updateStore(storeData) {
        return await store_model_1.default.updateOne({ owner: storeData.userId }, { $set: storeData });
    }
    async findStore(option) {
        const store = await store_model_1.default.findOne(option);
        if (store === null) {
            throw new utils_1.AppError(404, 'Store not found.');
        }
        return store;
    }
    async findStoreById(storeId) {
        if (!mongoose.Types.ObjectId.isValid(storeId)) {
            throw new utils_1.AppError(400, 'Invalid store ID.');
        }
        const store = await store_model_1.default.findOne({ _id: storeId });
        if (store === null) {
            throw new utils_1.AppError(404, 'Store not found.');
        }
        return store;
    }
    async findAllStores() {
        return await store_model_1.default.find().populate({ path: 'owner', select: 'name -_id' }).exec();
    }
    async searchStore(name) {
        const products = await store_model_1.default.find({ businessName: { $regex: name, $options: 'i' } });
        if (products.length === 0) {
            throw new utils_1.AppError(404, 'No store found for search term');
        }
        return products;
    }
}
exports.StoreService = StoreService;
//# sourceMappingURL=store.service.js.map