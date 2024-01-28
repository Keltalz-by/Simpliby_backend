"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToBuyService = void 0;
const mongoose_1 = require("mongoose");
const toBuy_model_1 = __importDefault(require("./toBuy.model"));
const utils_1 = require("../../utils");
class ToBuyService {
    async createToBuy(data) {
        return await toBuy_model_1.default.insertMany(data);
    }
    async completeToBuy(id, userId) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new utils_1.AppError(400, 'Invalid ID');
        }
        const toBuy = await toBuy_model_1.default.findOne({ _id: id });
        if (toBuy === null) {
            throw new utils_1.AppError(404, 'ToBuy not found');
        }
        if (String(toBuy.userId) !== String(userId)) {
            throw new utils_1.AppError(403, 'Not your tobuy');
        }
        toBuy.isCompleted = true;
        await toBuy.save();
        return toBuy;
    }
    async deleteToBuy(id, userId) {
        if (!mongoose_1.Types.ObjectId.isValid(id)) {
            throw new utils_1.AppError(400, 'Invalid ID');
        }
        const toBuy = await toBuy_model_1.default.findOne({ _id: id });
        if (toBuy === null) {
            throw new utils_1.AppError(404, 'ToBuy not found');
        }
        if (String(toBuy.userId) !== String(userId)) {
            throw new utils_1.AppError(403, 'Not your tobuy');
        }
        return await toBuy.deleteOne();
    }
}
exports.ToBuyService = ToBuyService;
//# sourceMappingURL=toBuy.service.js.map