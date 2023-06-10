import { Ref, Severity, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { type User } from '../user/user.model';

@modelOptions({
  schemaOptions: {
    collection: 'stores',
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class Store {
  @prop({ ref: 'User', required: true })
  public owner: Ref<User>;

  @prop({ required: true })
  public businessName: string;

  @prop({ required: true })
  public location: string;

  @prop({ required: true })
  public description: string;

  @prop({ required: true })
  public address: string;

  @prop({ required: true })
  public city: string;

  @prop({ required: true, default: 'Nigeria' })
  public country: string;

  @prop()
  public storeImages: object[];

  @prop()
  public logo: object;

  @prop({ default: false })
  public verified: boolean;
}

const StoreModel = getModelForClass(Store);
export default StoreModel;
