import { type Request, type Response, type NextFunction } from 'express';
import _ from 'lodash';
import { createToken, accessTokenCookieOptions } from '../../utils';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { OTPService } from '../otp/otp.service';
import { type ResendOTPInput, type OtpInput } from '../otp/otp.schema';
import { type RegisterInput, type LoginInput, type ForgotPasswordInput, type ResetPasswordInput } from './auth.schema';
import { privateFields } from '../user/user.model';

const logout = (res: Response) => {
  res.cookie('accessToken', '', { maxAge: 1 });
  res.cookie('refreshToken', '', { maxAge: 1 });
  res.cookie('loggedIn', false, { maxAge: 1 });
};

export class AuthController {
  public authService = new AuthService();
  public userService = new UserService();
  public otpService = new OTPService();

  public registerUser = async (req: Request<{}, {}, RegisterInput>, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const user = await this.authService.signup(userData);

      res.status(201).json({
        success: true,
        message: 'User created successfully. Check your email for verification code',
        data: user._id
      });
    } catch (error: any) {
      next(error);
    }
  };

  public loginUser = async (req: Request<{}, {}, LoginInput>, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const user = await this.authService.login(userData);

      createToken(res, JSON.stringify(user._id));

      const data = _.omit(user.toJSON(), privateFields);

      res.status(200).json({ success: true, message: 'User logged in successfully', data });
    } catch (error: any) {
      next(error);
    }
  };

  public logoutUser = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      logout(res);

      res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (err: any) {
      next(err);
    }
  };

  public verifyEmail = async (req: Request<{}, {}, OtpInput>, res: Response, next: NextFunction) => {
    try {
      const { otp } = req.body;

      await this.authService.verifyEmail(otp);

      res.status(200).json({ success: true, message: 'User verified successfully. Proceed to login' });
    } catch (error) {
      next(error);
    }
  };

  public refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refreshToken: string = req.cookies.refreshToken;

      const accessToken = await this.authService.refreshAccessToken(refreshToken);

      res.cookie('accessToken', accessToken, accessTokenCookieOptions);
      res.cookie('loggedIn', true, accessTokenCookieOptions);
      res.status(200).json({ success: true, message: 'Access token refreshed successfully' });
    } catch (err: any) {
      next(err);
    }
  };

  public resendOtp = async (req: Request<{}, {}, ResendOTPInput>, res: Response, next: NextFunction) => {
    try {
      const { userId, email } = req.body;

      await this.authService.resendOtp(userId, email);

      res.status(200).json({ success: true, message: 'OTP resent successfully. Check your email for the new OTP.' });
    } catch (err: any) {
      next(err);
    }
  };

  public forgotPassword = async (req: Request<{}, {}, ForgotPasswordInput>, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      await this.authService.forgotPassword(email);

      res.status(200).json({ success: true, message: 'Check your email for reset OTP' });
    } catch (error: any) {
      next(error);
    }
  };

  public verifyEmailForgotPassword = async (req: Request<{}, {}, OtpInput>, res: Response, next: NextFunction) => {
    try {
      const { otp } = req.body;

      await this.authService.verifyEmailForForgotPassword(otp);

      res.status(200).json({ success: true, message: 'Proceed to reset your password' });
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (
    req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;
      const { password } = req.body;

      await this.authService.resetPassword(userId, password);

      res.status(200).json({ success: true, message: 'Password reset successful. Procees to login.' });
    } catch (error: any) {
      next(error);
    }
  };
}
