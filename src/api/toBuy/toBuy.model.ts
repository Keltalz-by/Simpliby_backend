import { modelOptions, prop, Severity, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from '../user/user.model';

@modelOptions({
  schemaOptions: {
    collection: 'tobuy',
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class ToBuy {
  @prop({ ref: () => User, required: true })
  public userId: Ref<User>;

  @prop({ required: true, unique: true })
  public title!: string;

  @prop({ default: false })
  public isCompleted?: boolean;
}

const ToBuyModel = getModelForClass(ToBuy);
export default ToBuyModel;
