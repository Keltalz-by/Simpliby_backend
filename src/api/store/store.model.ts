import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { User } from '../user/user.model';

export class Store {
  @prop({ ref: () => User })
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
}

const StoreModel = getModelForClass(Store);
export default StoreModel;
