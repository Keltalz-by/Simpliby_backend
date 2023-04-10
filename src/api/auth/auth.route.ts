/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { type Routes } from '@src/common';
import { AuthController } from './auth.controller';
import { validateResource } from '../../middlewares';
import { loginSchema, registerSchema } from './auth.schema';
import { verifySchema, resendOTPSchema } from '../otp/otp.schema';

export class AuthRoute implements Routes {
  public path = '/auth/';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}register`, validateResource(registerSchema), this.auth.signin);
    this.router.post(`${this.path}login`, validateResource(loginSchema), this.auth.loginUser);
    this.router.post(`${this.path}verify`, validateResource(verifySchema), this.auth.verifyEmail);
    this.router.post(`${this.path}resendOtp`, validateResource(resendOTPSchema), this.auth.resendOtp);
    this.router.get(`${this.path}refresh`, this.auth.refreshAccessToken);
    this.router.get(`${this.path}logout`, this.auth.logoutUser);
  }
}
