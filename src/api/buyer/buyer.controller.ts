import { type Request, type Response, type NextFunction } from 'express';
import { AppError, logger, otpGenerator, sendOtpVerificationMail } from '../../utils';
import { BuyerService } from './buyer.service';
import { OTPService } from '../otp/otp.service';
// import { type KeyStringAny, type DocumentType } from '@typegoose/typegoose/lib/types';
import { type RegisterBuyerInput } from './buyer.schema';

const buyerService = new BuyerService();
const otpService = new OTPService();

// function checkForClass<T extends User>(doc: mongoose.Document & KeyStringAny, name: string): doc is DocumentType<T> {
//     return doc?.__t === name;
// }

export class BuyerController {
  public registerBuyer = async (req: Request<{}, {}, RegisterBuyerInput>, res: Response, next: NextFunction) => {
    try {
      const buyerInput = req.body;
      const newOtp = otpGenerator(4, {
        digits: true,
        lowerCaseAlphabets: true,
        upperCaseAlphabets: true,
        specialChars: false
      });

      const buyer = await buyerService.createBuyer(buyerInput);
      const otp = await otpService.createOTP(buyer._id, newOtp);

      await sendOtpVerificationMail(buyer.name, buyer.email, newOtp);

      logger.info(otp);

      return res.status(201).json({ success: true, message: 'Check your email for verification code' });
    } catch (err: any) {
      if (err.code === 11000) {
        next(new AppError(409, 'User with email already exist'));
        return;
      }

      next(err);
    }
  };
}
