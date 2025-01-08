/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { ACCESS_TOKEN_EXPIRESIN, ACCESS_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_PUBLIC_KEY } from '../../config';
import UserModel from '../user/user.model';
import {
  AppError,
  createOtp,
  emailVerifiedTemplate,
  emailVerifiedPasswordTemplate,
  requestPasswordTemplate,
  passwordResetCompleteTemplate,
  sendMail,
  sendOtpVerificationMail,
  signJwt,
  verifyJwt
} from '../../utils';
import OTPModel from '../otp/otp.model';
import { type IRegister, type ILogin } from './auth.interface';
import { UserService } from '../user/user.service';
import { type IUser } from '../user/user.interface';

export class AuthService {
  public userService = new UserService();

  public async signup(userData: IRegister): Promise<IUser> {
    const user = await UserModel.findOne({ email: userData.email });

    if (user !== null) {
      throw new AppError(409, `Use with email ${user.email} already exist`);
    }

    const newOtp: string = createOtp();

    const tokenExpiration: Date = new Date(Date.now() + 20 * 60 * 1000);

    const newUser = await UserModel.create({
      EmailVerificationToken: newOtp,
      EmailVerificationTokenExpiresAt: tokenExpiration,
      ...userData
    });

    await sendOtpVerificationMail(newUser.name, newUser.email, newOtp);

    return newUser;
  }

  public async login(userData: ILogin) {
    const user = await UserModel.findOne({ email: userData.email });

    if (user === null) {
      throw new AppError(400, 'Invalid email or password');
    }

    const isValidPassword = await user.validatePassword(userData.password);

    if (!isValidPassword) {
      throw new AppError(400, 'Invalid email or password');
    }

    if (!user.isEmailVerified) {
      throw new AppError(400, 'Please verify your email');
    }

    return user;
  }

  public async verifyEmail(otp: string) {
    const user = await UserModel.findOne({
      EmailVerificationToken: otp,
      EmailVerificationTokenExpiresAt: { $gt: Date.now() }
    });

    if (user === null) {
      throw new AppError(400, 'Invalid OTP or OTP has expired');
    }

    user.isEmailVerified = true;
    user.EmailVerificationToken = undefined;
    user.EmailVerificationTokenExpiresAt = undefined;

    await user.save();

    const message = emailVerifiedTemplate(user.name);
    return await sendMail(user.email, 'Email Verification Successful', message);
  }

  public async refreshAccessToken(refreshToken: string) {
    const decoded = verifyJwt<{ userId: string }>(refreshToken, REFRESH_TOKEN_PUBLIC_KEY as string);

    if (decoded === null) {
      throw new AppError(403, 'Could not refresh access token');
    }
    const user = await this.userService.findUser({ _id: JSON.parse(decoded.userId) });
    if (user === null) {
      throw new AppError(401, 'User not logged in');
    }

    const newAccessToken = signJwt({ userId: JSON.stringify(user._id) }, ACCESS_TOKEN_PRIVATE_KEY as string, {
      expiresIn: ACCESS_TOKEN_EXPIRESIN
    });

    return newAccessToken;
  }

  public async resendOtp(userId: string, email: string) {
    const user = await UserModel.findOne({ email });

    if (user !== null && String(user._id) === userId) {
      if (user.isEmailVerified) {
        throw new AppError(400, 'User already verified');
      }

      await OTPModel.deleteOne({ owner: userId });

      const newOtp: string = createOtp();

      let tokenExpiration: any = new Date();
      tokenExpiration = tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 20);

      await OTPModel.create({ owner: userId, code: newOtp, expiration: tokenExpiration, type: 'Email Verification' });
      return await sendOtpVerificationMail(user.name, user.email, newOtp);
    }
    throw new AppError(404, 'User not found');
  }

  public async forgotPassword(email: string) {
    const user = await UserModel.findOne({ email });

    if (user === null) {
      throw new AppError(404, 'User does not exist');
    }

    if (!user.isEmailVerified) {
      throw new AppError(400, 'User not verified. Check your email for verification code or request for a new OTP.');
    }

    const newOtp: string = createOtp();

    const tokenExpiration: Date = new Date(Date.now() + 20 * 60 * 1000);

    user.resetPasswordToken = newOtp;
    user.resetPasswordTokenExpiresAt = tokenExpiration;

    await user.save();

    const message = requestPasswordTemplate(user.name, newOtp);

    return await sendMail(email, 'Request for Password Reset', message);
  }

  public async verifyEmailForForgotPassword(otp: string) {
    const user = await UserModel.findOne({
      resetPasswordToken: otp,
      resetPasswordTokenExpiresAt: { $gt: Date.now() }
    });

    if (user === null) {
      throw new AppError(400, 'Invalid OTP or OTP has expired');
    }

    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    const message = emailVerifiedPasswordTemplate(user.name);
    return await sendMail(user.email, 'Email Verification Successful', message);
  }

  public async resetPassword(userId: string, password: string) {
    const user = await UserModel.findOne({ _id: userId });

    if (user !== null) {
      console.log(user);
      user.password = password;

      await user.save();

      const message = passwordResetCompleteTemplate(user.name);

      return await sendMail(user.email, 'Password Reset Successful', message);
    }
    throw new AppError(404, 'User does not exist');
  }
}
