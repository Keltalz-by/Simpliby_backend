import { AppError } from '../../utils';
import { type DocumentType, modelOptions, index, prop, Severity, pre, getModelForClass } from '@typegoose/typegoose';
import argons2 from 'argon2';

export const privateFields = ['password', '__v'];
@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const hash = await argons2.hash(this.password);
  this.password = hash;
})
@index({ email: 1 })
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
  @prop({ required: true })
  public name: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  @prop({ default: false })
  public verified: boolean;

  @prop({ default: null })
  public resetPasswordToken: string | null;

  @prop()
  public resetPasswordTokenExpiration: Date;

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argons2.verify(this.password, candidatePassword);
    } catch (err) {
      throw new AppError(400, 'Could not validate password');
    }
  }
}

const UserModel = getModelForClass(User);
export default UserModel;
