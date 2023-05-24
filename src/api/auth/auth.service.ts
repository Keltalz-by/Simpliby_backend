import { type DocumentType } from '@typegoose/typegoose';
import crypto from 'crypto';
import argon2 from 'argon2';
import {
  ACCESS_TOKEN_EXPIRESIN,
  REFRESH_TOKEN_EXPIRESIN,
  ACCESS_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PRIVATE_KEY
} from '../../config';
import UserModel, { type User } from '../user/user.model';
import {
  AppError,
  emailVerifiedTemplate,
  otpGenerator,
  passwordResetCompleteTemplate,
  redisClient,
  sendMail,
  sendOtpVerificationMail,
  signJwt
} from '../../utils';
import ResetTokenModel from '../resetToken/resetToken.model';
import OTPModel from '../otp/otp.model';
import { type ILogin } from './auth.interface';

export class AuthService {
  public async signup(userData: Partial<User>): Promise<User> {
    const user = await UserModel.findOne({ email: userData.email });

    if (user !== null) {
      throw new AppError(409, `User ${user.email} already exist`);
    }

    const newOtp: string = otpGenerator(4, {
      digits: true,
      lowerCaseAlphabets: true,
      upperCaseAlphabets: true,
      specialChars: false
    });

    const newUser = await UserModel.create(userData);
    await OTPModel.create({ owner: newUser._id, code: newOtp });
    await sendOtpVerificationMail(newUser.name, newUser.email, newOtp);

    return newUser;
  }

  public async login(userData: ILogin) {
    const user = await UserModel.findOne({ email: userData.email });

    if (user === null) {
      throw new AppError(404, 'Invalid email or password');
    }

    const isValidPassword = await user.validatePassword(userData.password);

    if (!isValidPassword) {
      throw new AppError(400, 'Invalid email or password');
    }

    if (!user.verified) {
      throw new AppError(400, 'Please verify your email');
    }

    const { accessToken, refreshToken } = await this.signToken(user);

    return { user, accessToken, refreshToken };
  }

  public async verifyEmail(userId: string, otp: string) {
    const otpRecord = await OTPModel.findOne({ owner: userId });
    const user = await UserModel.findOne({ _id: userId });

    if (otpRecord === null) {
      throw new AppError(404, 'User does not exists or has been verified or OTP has expired');
    }

    const isOtpValid = await otpRecord.validateOTP(otp);

    if (!isOtpValid) {
      throw new AppError(400, 'Invalid OTP.');
    }

    await UserModel.updateOne({ _id: userId }, { $set: { verified: true } });
    await OTPModel.deleteOne({ owner: userId });

    const message = emailVerifiedTemplate(user?.name as string);

    return await sendMail(user?.email as string, 'Email Verification Successful', message);
  }

  public async signToken(user: DocumentType<User>) {
    const accessToken = signJwt({ sub: user._id }, ACCESS_TOKEN_PRIVATE_KEY as string, {
      expiresIn: ACCESS_TOKEN_EXPIRESIN
    });

    const refreshToken = signJwt({ sub: user._id }, REFRESH_TOKEN_PRIVATE_KEY as string, {
      expiresIn: REFRESH_TOKEN_EXPIRESIN
    });

    await redisClient.set(JSON.stringify(user._id), JSON.stringify(user), {
      EX: 60 * 60
    });

    return { accessToken, refreshToken };
  }

  public async resendOtp(userId: string, email: string) {
    const user = await UserModel.findOne({ email });

    if (user !== null) {
      if (user.verified) {
        throw new AppError(400, 'User already verified');
      }

      await OTPModel.deleteOne({ owner: userId });

      const newOtp: string = otpGenerator(4, {
        digits: true,
        lowerCaseAlphabets: true,
        upperCaseAlphabets: true,
        specialChars: false
      });

      await OTPModel.create({ owner: userId, code: newOtp });
      return await sendOtpVerificationMail(user.name, user.email, newOtp);
    }
    throw new AppError(404, 'User not found');
  }

  public async requestPasswordReset(email: string) {
    const user = await UserModel.findOne({ email });

    if (user === null) {
      throw new AppError(404, 'User does not exist');
    }

    if (!user.verified) {
      throw new AppError(400, 'User not verified. Check your email for verification code or request for a new code.');
    }

    const oldToken = await ResetTokenModel.findOne({ _id: user._id });
    if (oldToken !== null) {
      await oldToken.deleteOne();
    }

    const newToken = `${crypto.randomBytes(32).toString('hex')}${String(user._id)}`;
    const hash = await argon2.hash(newToken);

    await ResetTokenModel.create({
      owner: user._id,
      token: hash,
      createdAt: Date.now(),
      expiresAt: Date.now() + 20 * 60 * 1000
    });

    return { user, newToken };
  }

  public async resetPassword(userId: string, password: string, token: string) {
    const resetToken = await ResetTokenModel.findOne({ owner: userId, expiresAt: { $gt: Date.now() } });

    if (resetToken === null) {
      throw new AppError(400, 'Invalid reset token or reset token has expired');
    }

    const isTokenValid = await resetToken.validateToken(token);

    if (!isTokenValid) {
      throw new AppError(400, 'Invalid reset token or reset token has expired');
    }

    const user = await UserModel.findOne({ _id: resetToken.owner });

    if (user !== null) {
      user.password = password;

      await user.save();
      await ResetTokenModel.deleteOne({ owner: userId });

      const message = passwordResetCompleteTemplate(user.name);

      return await sendMail(user.email, 'Password Reset Successful', message);
    }
    throw new AppError(404, 'User does not exist');
  }
}
