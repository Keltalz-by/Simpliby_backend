import { AppError } from '../../utils';
import { modelOptions, pre, prop, Severity, getModelForClass, Ref, type DocumentType } from '@typegoose/typegoose';
import argon2 from 'argon2';
import { User } from '../user/user.model';

@pre<OTP>('save', async function () {
  if (!this.isModified('code')) {
    return;
  }

  const hash = await argon2.hash(this.code);
  this.code = hash;
})
@modelOptions({
  schemaOptions: {
    collection: 'otp',
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class OTP {
  @prop({ ref: () => User })
  public owner: Ref<User>;

  @prop({ required: true })
  public code: string;

  @prop({ default: null })
  public expiration: Date;

  async validateOTP(this: DocumentType<OTP>, code: string) {
    try {
      return await argon2.verify(this.code, code);
    } catch (err) {
      throw new AppError(400, 'Could not validate otp');
    }
  }
}

const OTPModel = getModelForClass(OTP);
export default OTPModel;
