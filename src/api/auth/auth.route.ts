/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
// import { type Routes } from '@src/common';
import { AuthController } from './auth.controller';
import { deserializeUser, requireUser, validateResource } from '../../middlewares';
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from './auth.schema';
import { verifySchema, resendOTPSchema } from '../otp/otp.schema';

export const authRoute = Router();
const path = '/auth';
const auth = new AuthController();

authRoute.post(`${path}/register`, validateResource(registerSchema), auth.registerUser);
authRoute.post(`${path}/verify`, validateResource(verifySchema), auth.verifyEmail);
authRoute.post(`${path}/login`, validateResource(loginSchema), auth.loginUser);
authRoute.post(`${path}/resendotp`, validateResource(resendOTPSchema), auth.resendOtp);
authRoute.get(`${path}/refresh`, auth.refreshAccessToken);
authRoute.post(`${path}/forgotpassword`, validateResource(forgotPasswordSchema), auth.forgotPassword);
authRoute.patch(`${path}/resetpassword`, validateResource(resetPasswordSchema), auth.resetPassword);
authRoute.get(`${path}/logout`, deserializeUser, requireUser, auth.logoutUser);

// export class AuthRoute {
//   public path = '/auth/';
//   public router = Router();
//   public auth = new AuthController();

//   constructor() {
//     this.initializeRoutes();
//   }

//   private initializeRoutes() {
//     this.router.patch(`${this.path}resetpassword`, validateResource(resetPasswordSchema), this.auth.resetPassword);
//     this.router.use(deserializeUser, requireUser);
//     this.router.get(`${this.path}logout`, this.auth.logoutUser);
//   }
// }
