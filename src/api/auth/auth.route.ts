/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { type Routes } from '@src/common';
import { AuthController } from './auth.controller';
import { validateResource } from '../../middlewares';
import { registerSchema } from './auth.schema';
import { verifySchema, resendOTPSchema } from '../otp/otp.schema';

export class AuthRoute implements Routes {
  public path = '/auth/';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}signup`, validateResource(registerSchema), this.auth.signUp);
    this.router.post(`${this.path}verify`, validateResource(verifySchema), this.auth.verifyEmail);
    this.router.post(`${this.path}resendOtp`, validateResource(resendOTPSchema), this.auth.resendOtp);
  }
}
