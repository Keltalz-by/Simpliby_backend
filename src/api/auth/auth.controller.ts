import { type Request, type Response, type NextFunction, type CookieOptions } from 'express';
// import { omit } from 'lodash';
import { AppError, logger, otpGenerator, redisClient, sendOtpVerificationMail, signJwt, verifyJwt } from '../../utils';
// import { privateFields } from '../user/user.model';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { OTPService } from '../otp/otp.service';
import { type ResendOTPInput, type OtpInput } from '../otp/otp.schema';
import { ACCESS_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_PUBLIC_KEY, ACCESS_TOKEN_EXPIRESIN } from '../../config';
import { type RegisterInput } from './auth.schema';

const authService = new AuthService();
const userService = new UserService();
const otpService = new OTPService();

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15mins
  httpOnly: true,
  domain: 'localhost',
  path: '/',
  secure: process.env.NODE_ENV === 'production'
};

const logout = (res: Response) => {
  res.cookie('access_token', '', { maxAge: 1 });
  res.cookie('refresh_token', '', { maxAge: 1 });
  res.cookie('logged_in', '', { maxAge: 1 });
};

export class AuthController {
  /* This is a function that is called when a user signs up. 
        It creates a new user and sends an email to the user with 
        a verification code.
    */
  public loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const message = 'Invalid email or password';

    const { email, password } = req.body;

    const user = await userService.findUser({ email });

    if (user == null) {
      next(new AppError(400, message));
      return;
    }

    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
      next(new AppError(400, message));
    }

    if (!user.verified) {
      next(new AppError(400, 'Please verify your email'));
      return;
    }

    const { accessToken, refreshToken } = await authService.signToken(user);

    const refreshTokenCookieOptions: CookieOptions = {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: req.hostname,
      path: '/',
      secure: process.env.NODE_ENV === 'production'
    };

    res.cookie('accessToken', accessToken, accessTokenCookieOptions);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
    res.cookie('loggedIn', true, accessTokenCookieOptions);
    res.status(200).json({ success: true, data: { accessToken } });
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

      const user = await userService.findUser({ _id: JSON.parse(session)._id });

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
      res.status(200).json({ success: true, data: { accessToken } });
    } catch (err: any) {
      next(err);
    }
  };

  public verifyEmail = async (req: Request<OtpInput>, res: Response, next: NextFunction) => {
    try {
      const { userId, otp } = req.body;

      const otpRecord = await otpService.findOTP(userId);

      if (otpRecord == null) {
        next(new AppError(404, 'User does not exists or has been verified or OTP has expired'));
        return;
      }

      const { createdAt, expiresAt } = otpRecord;

      if (expiresAt < createdAt) {
        await otpService.deleteOTP(userId);
        next(new AppError(400, 'OTP expired. Resend OTP.'));
        return;
      }

      const isOtpValid = await otpRecord.validateOTP(otp);

      if (!isOtpValid) {
        next(new AppError(400, 'Invalid OTP.'));
        return;
      }

      await userService.verifyUser(userId);
      await otpService.deleteOTP(userId);

      return res.status(200).json({ success: true, message: 'User verified successfully' });
    } catch (err) {
      next(err);
    }
  };

  public resendOtp = async (req: Request<ResendOTPInput>, res: Response, next: NextFunction) => {
    try {
      const { userId, email } = req.body;

      const user = await userService.findUser({ email });

      if (user !== null) {
        await otpService.deleteOTP(userId);

        const newOtp = otpGenerator(4, {
          digits: true,
          lowerCaseAlphabets: true,
          upperCaseAlphabets: true,
          specialChars: false
        });
        const otp = await otpService.createOTP(userId, newOtp);

        logger.info(otp);

        await sendOtpVerificationMail(user.name, user.email, newOtp);

        return res.status(201).json({ success: true, message: 'OTP resent successfully' });
      }
      return res.status(404).json({ success: false, message: 'User does not exist' });
    } catch (err) {
      next(err);
    }
  };

  public signin = async (req: Request<RegisterInput>, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const newOtp = otpGenerator(4, {
        digits: true,
        lowerCaseAlphabets: true,
        upperCaseAlphabets: true,
        specialChars: false
      });

      const user = await authService.signup(userData);
      const otp = await otpService.createOTP(user._id, newOtp);

      await sendOtpVerificationMail(user.name, user.email, newOtp);

      logger.info(otp);

      return res.status(201).json({ data: user });
    } catch (err: any) {
      if (err.code === 11000) {
        next(new AppError(409, 'Store with email already exist'));
        return;
      }

      next(err);
    }
  };
  // `${req.protocol}://${req.get("host")}`
}
