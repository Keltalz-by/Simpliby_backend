/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
// import { type Routes } from '@src/common';
import { UserController } from './user.controller';
import { deserializeUser, requireUser, restrictUser } from '../../middlewares';

export const userRoute = Router();
const path = '/users';
const user = new UserController();

userRoute.get(`${path}/profile`, deserializeUser, requireUser, user.getUserProfile);
userRoute.delete(`${path}/:userId`, deserializeUser, requireUser, restrictUser('user'), user.deleteUser);
userRoute.get(`${path}`, deserializeUser, requireUser, restrictUser('admin'), user.getAllUsers);

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
