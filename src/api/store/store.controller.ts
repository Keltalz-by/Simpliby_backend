import { type Request, type Response, type NextFunction } from 'express';
import { AppError, logger, otpGenerator, sendOtpVerificationMail } from '../../utils';
import { StoreService } from './store.service';
import { OTPService } from '../otp/otp.service';
import type mongoose from 'mongoose';
import { type KeyStringAny, type DocumentType } from '@typegoose/typegoose/lib/types';
import { type User, Types } from '../user/user.model';
import { type Store } from './store.model';
import { type StoreRegisterInput } from './store.schema';

const storeService = new StoreService();
const otpService = new OTPService();

function checkForClass<T extends User>(doc: mongoose.Document & KeyStringAny, name: string): doc is DocumentType<T> {
  return doc?.__t === name;
}

export class StoreController {
  public createStore = async (req: Request<{}, {}, StoreRegisterInput>, res: Response, next: NextFunction) => {
    try {
      const storeData = req.body;
      const newOtp = otpGenerator(4, {
        digits: true,
        lowerCaseAlphabets: true,
        upperCaseAlphabets: true,
        specialChars: false
      });

      const store = await storeService.createStore(storeData);
      const otp = await otpService.createOTP(store._id, newOtp);

      await sendOtpVerificationMail(store.businessName, store.email, newOtp);

      logger.info(otp);

      return res.status(201).json({ data: store });
    } catch (err: any) {
      if (err.code === 11000) {
        next(new AppError(409, 'User with email already exist'));
        return;
      }

      next(err);
    }
  };

  public findAllStores = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const stores = await storeService.findAllStores();
      return res.status(200).json({ success: true, data: stores });
    } catch (err: any) {
      next(err);
    }
  };

  public updateStore = async (req: Request<{ storeId: string }, {}, {}>, res: Response, next: NextFunction) => {
    try {
      const storeId = req.params.storeId;
      const update = req.body;

      const store = await storeService.findStoreById(storeId);

      if (store === null) {
        next(new AppError(404, 'Store not found'));
      }

      const updatedStore = await storeService.updateStore(storeId, update);

      logger.info(updatedStore);

      return res.status(200).json({ success: true, message: 'Store updated successfully' });

      // if (checkForClass<Store>(store, Types.STORE)) {
      //     console.log(store.businessName)
      //     return res.status(200).json({ success: true, data: updatedStore })
      // }
    } catch (err: any) {
      next(err);
    }
  };

  public findStore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const storeId = req.params.storeId;

      const store = await storeService.findStoreById(storeId);

      if (store === null) {
        next(new AppError(404, 'Store not found'));
      }

      if (checkForClass<Store>(store, Types.STORE)) {
        console.log(store);
        return res.status(200).json({ success: true, data: store });
      }
    } catch (err: any) {
      next(err);
    }
  };
}
