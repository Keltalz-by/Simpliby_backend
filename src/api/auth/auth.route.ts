/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { type Routes } from '@src/common';
import { AuthController } from './auth.controller';
import { deserializeUser, requireUser, validateResource } from '../../middlewares';
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from './auth.schema';
import { verifySchema, resendOTPSchema } from '../otp/otp.schema';

export class AuthRoute implements Routes {
  public path = '/auth/';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}register`, validateResource(registerSchema), this.auth.registerUser);
    this.router.post(`${this.path}verify`, validateResource(verifySchema), this.auth.verifyEmail);
    this.router.post(`${this.path}login`, validateResource(loginSchema), this.auth.loginUser);
    this.router.post(`${this.path}resendotp`, validateResource(resendOTPSchema), this.auth.resendOtp);
    this.router.get(`${this.path}refresh`, this.auth.refreshAccessToken);
    this.router.post(`${this.path}forgotpassword`, validateResource(forgotPasswordSchema), this.auth.forgotPassword);
    this.router.patch(`${this.path}resetpassword`, validateResource(resetPasswordSchema), this.auth.resetPassword);
    this.router.use(deserializeUser, requireUser);
    this.router.get(`${this.path}logout`, this.auth.logoutUser);
  }
}
