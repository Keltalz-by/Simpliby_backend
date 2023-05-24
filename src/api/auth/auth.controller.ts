import { type Request, type Response, type NextFunction, type CookieOptions } from 'express';
import { AppError, redisClient, sendMail, signJwt, verifyJwt, requestPasswordTemplate } from '../../utils';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { OTPService } from '../otp/otp.service';
import { type ResendOTPInput, type OtpInput } from '../otp/otp.schema';
import { ACCESS_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_PUBLIC_KEY, ACCESS_TOKEN_EXPIRESIN, NODE_ENV } from '../../config';
import { type RegisterInput, type LoginInput, type ForgotPasswordInput, type ResetPasswordInput } from './auth.schema';
import type { IUser } from '../user/user.interface';
import { type ILogin } from './auth.interface';

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15mins
  httpOnly: true,
  domain: 'localhost',
  path: '/',
  secure: NODE_ENV === 'production'
};

const refreshTokenCookieOptions: CookieOptions = {
  maxAge: 3.154e10, // 1 year
  httpOnly: true,
  domain: 'localhost',
  path: '/',
  secure: NODE_ENV === 'production'
};

const logout = (res: Response) => {
  res.cookie('accessToken', '', { maxAge: 1 });
  res.cookie('refreshToken', '', { maxAge: 1 });
  res.cookie('loggedIn', '', { maxAge: 1 });
};

export class AuthController {
  public authService = new AuthService();
  public userService = new UserService();
  public otpService = new OTPService();

  public registerUser = async (req: Request<RegisterInput>, res: Response, next: NextFunction) => {
    try {
      const userData: IUser = req.body;
      const newUser = await this.authService.signup(userData);

      return res.status(201).json({
        success: true,
        message: 'Check your email for verification code',
        data: newUser
      });
    } catch (error: any) {
      next(error);
    }
  };

  public loginUser = async (req: Request<LoginInput>, res: Response, next: NextFunction) => {
    try {
      const userData: ILogin = req.body;

      const { accessToken, refreshToken, user } = await this.authService.login(userData);

      res.cookie('accessToken', accessToken, accessTokenCookieOptions);
      res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
      res.cookie('loggedIn', true, accessTokenCookieOptions);
      res.status(200).json({ success: true, data: { userId: user._id, accessToken } });
    } catch (error: any) {
      next(error);
    }
  };

  public logoutUser = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;
      await redisClient.del(JSON.stringify(user._id));

      logout(res);

      return res.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  };

  public verifyEmail = async (req: Request<OtpInput>, res: Response, next: NextFunction) => {
    try {
      const { userId, otp } = req.body;

      await this.authService.verifyEmail(userId, otp);

      return res.status(200).json({ success: true, message: 'User verified successfully' });
    } catch (err) {
      next(err);
    }
  };

  public refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;

      const decoded = verifyJwt<{ sub: string }>(refreshToken, REFRESH_TOKEN_PUBLIC_KEY as string);

      if (decoded == null) {
        next(new AppError(403, 'Could not refresh access token'));
        return;
      }

      const session = await redisClient.get(JSON.stringify(decoded.sub));

      if (session == null) {
        next(new AppError(403, 'No valid session exist for this user'));
        return;
      }

      const user = await this.userService.findUser({ _id: JSON.parse(session)._id });

      if (user == null) {
        next(new AppError(404, 'User does not exist'));
        return;
      }

      // Signing new access token
      const accessToken = signJwt({ sub: user._id }, ACCESS_TOKEN_PRIVATE_KEY as string, {
        expiresIn: ACCESS_TOKEN_EXPIRESIN
      });

      res.cookie('accessToken', accessToken, accessTokenCookieOptions);
      res.cookie('loggedIn', true, accessTokenCookieOptions);
      return res.status(200).json({ success: true, data: { accessToken } });
    } catch (err: any) {
      next(err);
    }
  };

  public resendOtp = async (req: Request<ResendOTPInput>, res: Response, next: NextFunction) => {
    try {
      const { userId, email } = req.body;

      await this.authService.resendOtp(userId, email);

      return res
        .status(200)
        .json({ success: true, message: 'OTP resent successfully. Check your email for the new OTP.' });
    } catch (err: any) {
      next(err);
    }
  };

  public forgotPassword = async (req: Request<ForgotPasswordInput>, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const { user, newToken } = await this.authService.requestPasswordReset(email);

      // const link = `${req.protocol}://${req.hostname}${req.baseUrl}/auth/resetpassword/${newToken}`
      const message = requestPasswordTemplate(user.name, newToken);

      await sendMail(email, 'Request for Password Reset', message);
      return res.status(200).json({ success: true, message: 'Check your email for reset link', resetToken: newToken });
    } catch (error: any) {
      next(error);
    }
  };

  public resetPassword = async (req: Request<ResetPasswordInput>, res: Response, next: NextFunction) => {
    try {
      const { token } = req.params;
      const { userId, password } = req.body;

      await this.authService.resetPassword(userId, password, token);

      return res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error: any) {
      next(error);
    }
  };
}
