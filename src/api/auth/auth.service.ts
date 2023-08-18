/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import * as mongoose from 'mongoose';
import { ACCESS_TOKEN_EXPIRESIN, ACCESS_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_PUBLIC_KEY } from '../../config';
import UserModel from '../user/user.model';
import {
  AppError,
  createOtp,
  emailVerifiedPasswordTemplate,
  emailVerifiedTemplate,
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
      throw new AppError(409, `User ${user.email} already exist`);
    }

    const newOtp: string = createOtp();

    let tokenExpiration: any = new Date();
    tokenExpiration = tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 20);

    const newUser = await UserModel.create(userData);
    await OTPModel.create({
      owner: newUser._id,
      code: newOtp,
      expiration: tokenExpiration,
      type: 'Email Verification'
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

  public async verifyEmail(userId: string, otp: string) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError(400, 'Invalid user ID.');
    }

    const otpRecord = await OTPModel.findOne({ owner: userId });
    const user = await UserModel.findOne({ _id: userId });

    if (otpRecord === null) {
      throw new AppError(400, 'User does not exists or user has been verified or OTP has expired');
    }

    if (otpRecord.expiration < new Date(Date.now())) {
      await OTPModel.deleteOne({ owner: userId });
      throw new AppError(400, 'OTP is expired. Request for another one.');
    }

    const isOtpValid = await otpRecord.validateOTP(otp);

    if (!isOtpValid) {
      throw new AppError(400, 'Invalid OTP.');
    }

    if (otpRecord.type === 'Email Verification') {
      await UserModel.updateOne({ _id: userId }, { $set: { isEmailVerified: true } });
      const message = emailVerifiedTemplate(user?.name as string);
      await OTPModel.deleteOne({ owner: userId });
      return await sendMail(user?.email as string, 'Email Verification Successful', message);
    } else if (otpRecord.type === 'Password Verification') {
      await UserModel.updateOne({ _id: userId }, { $set: { password: '' } });
      const message = emailVerifiedPasswordTemplate(user?.name as string);
      await OTPModel.deleteOne({ owner: userId });
      return await sendMail(user?.email as string, 'Email Verification Successful', message);
    } else {
      throw new AppError(400, 'Invalid OTP Type.');
    }
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
      throw new AppError(400, 'User not verified. Check your email for verification code or request for a new code.');
    }

    const newOtp: string = createOtp();

    let tokenExpiration: any = new Date();
    tokenExpiration = tokenExpiration.setMinutes(tokenExpiration.getMinutes() + 20);

    await OTPModel.create({
      owner: user._id,
      code: newOtp,
      expiration: tokenExpiration,
      type: 'Password Verification'
    });

    return { user, newOtp };
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
