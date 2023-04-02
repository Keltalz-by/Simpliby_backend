// import { ObjectId } from 'mongoose'
import OTPModel from '../otp/otp.model';

export class OTPService {
  public async createOTP(owner: Object, code: Object) {
    return await new OTPModel({ owner, code, createdAt: Date.now(), expiresAt: Date.now() + 5 * 60 * 1000 }).save();
  }

  public async findOTP(userId: string) {
    return await OTPModel.findOne({ owner: userId });
  }

  public async deleteOTP(userId: string) {
    return await OTPModel.deleteOne({ owner: userId });
  }
}
