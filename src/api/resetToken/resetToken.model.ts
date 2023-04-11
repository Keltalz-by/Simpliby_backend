import { modelOptions, prop, Severity, getModelForClass, Ref, type DocumentType } from '@typegoose/typegoose';
import argon2 from 'argon2';
import { AppError } from '../../utils';
import { User } from '../user/user.model';

@modelOptions({
  schemaOptions: {
    collection: 'reset-token'
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class ResetToken {
  @prop({ ref: () => User })
  public owner: Ref<User>;

  @prop({ required: true })
  public token: string;

  @prop({ required: true })
  public createdAt: Date;

  @prop({ required: true })
  public expiresAt: Date;

  public async validateToken(this: DocumentType<ResetToken>, token: string) {
    try {
      return await argon2.verify(this.token, token);
    } catch (err) {
      throw new AppError(400, 'Could not validate token');
    }
  }
}

const ResetTokenModel = getModelForClass(ResetToken);
export default ResetTokenModel;
