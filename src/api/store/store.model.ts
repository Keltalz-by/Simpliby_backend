import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { User } from '../user/user.model';

export class Store {
  @prop({ ref: () => User })
  public owner: Ref<User>;

  @prop()
  public businessName: string;

  @prop()
  public location: string;

  @prop()
  public description: string;

  @prop()
  public address: string;

  @prop()
  public city: string;

  @prop()
  public country: string;

  // @prop()
  // public images: string[];

  // @prop()
  // public logo: string;
}

const StoreModel = getModelForClass(Store);
export default StoreModel;
