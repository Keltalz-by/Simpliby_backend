import { AppError } from '../../utils';
import { type DocumentType, modelOptions, prop, Severity, pre, getModelForClass } from '@typegoose/typegoose';
import argon2 from 'argon2';

export const privateFields = ['password', '__v', 'resetPasswordToken', 'resetPasswordTokenExpiration'];

@pre<User>('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const hash = await argon2.hash(this.password);
  this.password = hash;
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
  toJSON(): any {
    throw new Error('Method not implemented.');
  }

  @prop({ required: true })
  public name: string;

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  @prop({ default: false })
  public verified: boolean;

  @prop()
  public phone: string;

  @prop()
  public location: string;

  @prop({ default: 'user' })
  public role: string;

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
