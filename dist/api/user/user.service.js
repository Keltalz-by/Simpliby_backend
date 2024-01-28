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
exports.UserService = void 0;
const mongoose = __importStar(require("mongoose"));
const utils_1 = require("../../utils");
const user_model_1 = __importDefault(require("../user/user.model"));
const store_model_1 = __importDefault(require("../store/store.model"));
class UserService {
    async findUser(option) {
        return await user_model_1.default.findOne(option).select('-password -createdAt -updatedAt -__v');
    }
    async followStore(userId, storeId) {
        if (!mongoose.Types.ObjectId.isValid(storeId)) {
            throw new utils_1.AppError(400, 'Invalid store ID.');
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new utils_1.AppError(400, 'Invalid user ID.');
        }
        const user = await user_model_1.default.findOne({ _id: userId });
        const store = await store_model_1.default.findOne({ _id: storeId });
        if (user === null) {
            throw new utils_1.AppError(404, 'User not found');
        }
        if (store === null) {
            throw new utils_1.AppError(404, 'Store not found.');
        }
        if (!store.followers.includes(userId)) {
            await store.updateOne({ $push: { followers: userId } });
            await user.updateOne({ $push: { followings: storeId } });
        }
        throw new utils_1.AppError(400, 'You have already followed this store');
    }
    async unfollowStore(userId, storeId) {
        if (!mongoose.Types.ObjectId.isValid(storeId)) {
            throw new utils_1.AppError(400, 'Invalid store ID.');
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            throw new utils_1.AppError(400, 'Invalid user ID.');
        }
        const user = await user_model_1.default.findOne({ _id: userId });
        const store = await store_model_1.default.findOne({ _id: storeId });
        if (user === null) {
            throw new utils_1.AppError(404, 'User not found');
        }
        if (store === null) {
            throw new utils_1.AppError(404, 'Store not found.');
        }
        if (store.followers.includes(userId)) {
            await store.updateOne({ $pull: { followers: userId } });
            await user.updateOne({ $pull: { followings: storeId } });
        }
        throw new utils_1.AppError(400, 'You do not follow store');
    }
    async findAllUsers() {
        return await user_model_1.default.find({}).orFail().exec();
    }
    async deleteUser(userId) {
        const user = await user_model_1.default.findOne({ _id: userId });
        if (user === null) {
            throw new utils_1.AppError(404, 'User not found');
        }
        return await user.deleteOne();
    }
    async updateUser(userId, options) {
        const user = await user_model_1.default.findOne({ _id: userId });
        if (user === null) {
            throw new utils_1.AppError(404, 'User not found');
        }
        return await user_model_1.default.findByIdAndUpdate({ _id: userId }, {
            $set: options
        }, { new: true });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map