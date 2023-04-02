import { type Request, type Response, type NextFunction } from 'express';
import { omit } from 'lodash';
import { AppError, logger, otpGenerator, sendOtpVerificationMail } from '../../utils';
import { privateFields } from '../user/user.model';
import { type RegisterInput } from './auth.schema';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { OTPService } from '../otp/otp.service';
import { type ResendOTPInput, type OtpInput } from '../otp/otp.schema';

const authService = new AuthService();
const userService = new UserService();
const otpService = new OTPService();

export class AuthController {
  /* This is a function that is called when a user signs up. 
        It creates a new user and sends an email to the user with 
        a verification code.
    */
  public signUp = async (req: Request<{}, {}, RegisterInput>, res: Response, next: NextFunction) => {
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

      return res
        .status(201)
        .json({ data: omit(user.toJSON(), privateFields), success: true, message: 'User created successfully' });
    } catch (err: any) {
      if (err.code === 11000) {
        next(new AppError(409, 'User with email already exist'));
        return;
      }

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
  // `${req.protocol}://${req.get("host")}`
}
