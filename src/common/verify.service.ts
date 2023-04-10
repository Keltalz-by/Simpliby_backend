import { type Request, type Response, type NextFunction } from 'express';
import { AppError } from '../utils';
import { OTPService } from '../api/otp/otp.service';
import { UserService } from '../api/user/user.service';

const otpService = new OTPService();
const userService = new UserService();

export const verifyEmail = (idType: string) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const otp = req.body.otp;
    idType = req.body.idType;

    const otpRecord = await otpService.findOTP(idType);

    if (otpRecord == null) {
      next(new AppError(404, 'User does not exists or has been verified or OTP has expired'));
      return;
    }

    const { createdAt, expiresAt } = otpRecord;

    if (expiresAt < createdAt) {
      await otpService.deleteOTP(idType);
      next(new AppError(400, 'OTP expired. Resend OTP.'));
      return;
    }

    const isOtpValid = await otpRecord.validateOTP(otp);

    if (!isOtpValid) {
      next(new AppError(400, 'Invalid OTP.'));
      return;
    }

    await userService.verifyUser(idType);
    await otpService.deleteOTP(idType);

    return res.status(200).json({ success: true, message: 'User verified successfully' });
  } catch (err) {
    next(err);
  }
};
