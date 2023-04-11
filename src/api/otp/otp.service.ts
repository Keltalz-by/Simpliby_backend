// import { ObjectId } from 'mongoose'
import OTPModel from '../otp/otp.model';

export class OTPService {
  public async createOTP(code: string, owner?: object) {
    return await OTPModel.create({ owner, code, createdAt: Date.now(), expiresAt: Date.now() + 5 * 60 * 1000 });
  }

  public async findOTP(userId: string) {
    return await OTPModel.findOne({ owner: userId });
  }

  public async deleteOTP(userId: string) {
    return await OTPModel.deleteOne({ owner: userId });
  }
}
