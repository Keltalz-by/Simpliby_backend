/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { type Routes } from '@src/common';
import { UserController } from './user.controller';
import { deserializeUser, requireUser } from '../../middlewares';

export class UserRoute implements Routes {
  public path = '/users/';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getAllUsers);
    this.router.use(deserializeUser, requireUser);
    this.router.get(`${this.path}profile`, this.user.getUserProfile);
    this.router.delete(`${this.path}:userId`, this.user.deleteUser);
  }
}
