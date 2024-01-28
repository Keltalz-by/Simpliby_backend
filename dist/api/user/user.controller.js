"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const mongoose_1 = require("mongoose");
const user_service_1 = require("./user.service");
const utils_1 = require("../../utils");
const lodash_1 = __importDefault(require("lodash"));
const profileDataNotNeeded = ['isEmailVerified', 'role', 'isSeller', '_id'];
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
        this.getAllUsers = async (_req, res, next) => {
            try {
                const users = await this.userService.findAllUsers();
                res.status(200).json({ success: true, data: users });
            }
            catch (err) {
                next(err);
            }
        };
        this.getUserProfile = async (_req, res, next) => {
            try {
                const user = res.locals.user;
                const profile = lodash_1.default.omit(user.toJSON(), profileDataNotNeeded);
                res.status(200).json({ success: true, data: profile });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateUserProfile = async (req, res, next) => {
            try {
                const user = res.locals.user;
                const profileData = req.body;
                await this.userService.updateUser(user.id, profileData);
                res.status(200).json({ success: true, message: 'Profile updated successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.followStore = async (req, res, next) => {
            try {
                const { storeId } = req.params;
                const userId = res.locals.user._id;
                await this.userService.followStore(userId, storeId);
                res.status(200).json({ status: true, message: 'Store followed successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.unfollowStore = async (req, res, next) => {
            try {
                const { storeId } = req.params;
                const userId = res.locals.user._id;
                await this.userService.unfollowStore(userId, storeId);
                res.status(200).json({ status: true, message: 'Store unfollowed successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteUser = async (req, res, next) => {
            try {
                const { userId } = req.params;
                const id = res.locals.user.user;
                if (!mongoose_1.Types.ObjectId.isValid(userId)) {
                    next(new utils_1.AppError(400, 'Invalid user ID'));
                    return;
                }
                if (id !== userId) {
                    next(new utils_1.AppError(403, 'You are not authorized to delete user'));
                    return;
                }
                await this.userService.deleteUser(userId);
                res.sendStatus(204);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map