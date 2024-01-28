"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
/* eslint-disable @typescript-eslint/no-misused-promises */
const express_1 = require("express");
// import { type Routes } from '@src/common';
const user_controller_1 = require("./user.controller");
const middlewares_1 = require("../../middlewares");
exports.userRoute = (0, express_1.Router)();
const path = '/users';
const user = new user_controller_1.UserController();
exports.userRoute.get(`${path}/profile`, middlewares_1.deserializeUser, middlewares_1.requireUser, user.getUserProfile);
exports.userRoute.patch(`${path}/profile/update`, middlewares_1.deserializeUser, middlewares_1.requireUser, user.updateUserProfile);
exports.userRoute.delete(`${path}/:userId`, middlewares_1.deserializeUser, middlewares_1.requireUser, (0, middlewares_1.restrictUser)('user'), user.deleteUser);
exports.userRoute.get(`${path}`, user.getAllUsers);
// userRoute.get(`${path}`, deserializeUser, requireUser, restrictUser('admin'), user.getAllUsers);
// export class UserRoute {
//   public path: '/users/';
//   public router: Router;
//   public user: UserController;
//   constructor() {
//     this.router = Router();
//     this.user = new UserController();
//     this.initializeRoutes();
//   }
//   private initializeRoutes() {
//     this.router.get(`${this.path}`, this.user.getAllUsers);
// this.router.get(
//   `${this.path}profile`,
//   deserializeUser,
//   requireUser,
//   restrictUser('user'),
//   this.user.getUserProfile
// );
//     this.router.delete(`${this.path}:userId`, deserializeUser, requireUser, restrictUser('user'), this.user.deleteUser);
//   }
// }
//# sourceMappingURL=user.route.js.map