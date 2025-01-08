import { type DocumentType, modelOptions, prop, Severity, pre, getModelForClass } from '@typegoose/typegoose';
import argon2 from 'argon2';
import { AppError } from '../../utils';

export const privateFields = ['__v', 'password', 'createdAt', 'updatedAt'];

@pre<User>('save', async function (next) {
  this.id = this._id;

  if (!this.isModified('password')) {
    return;
  }

  const hash = await argon2.hash(this.password);
  this.password = hash;
  next();
})
@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class User {
  @prop()
  id: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true, unique: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ default: false })
  isEmailVerified: boolean;

  @prop({ default: '+234' })
  phone: string;

  @prop({ default: 'location' })
  location: string;

  @prop({ default: 'buyer' })
  role: string;

  @prop({ default: false })
  isSeller: boolean;

  @prop({ default: 'what do you do?' })
  occupation: string;

  @prop({ default: [] })
  followings: string[];

  @prop({ default: null })
  resetPasswordToken?: string;

  @prop({ default: null })
  resetPasswordTokenExpiresAt?: Date;

  @prop({ default: null })
  EmailVerificationToken?: string;

  @prop({ default: null })
  EmailVerificationTokenExpiresAt?: Date;

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (err) {
      throw new AppError(400, 'Could not validate password');
    }
  }
}

const UserModel = getModelForClass(User);
export default UserModel;
