import { getDiscriminatorModelForClass, prop } from '@typegoose/typegoose';
import UserModel, { User, Types } from '../user/user.model';

export class Store extends User {
  @prop()
  public fullName: string;

  @prop()
  public businessName: string;

  @prop()
  public description: string;

  @prop()
  public storeAddress: string;

  @prop()
  public storeCity: string;

  @prop()
  public country: string;

  @prop()
  public images: string[];

  @prop()
  public logo: string;
}

const StoreModel = getDiscriminatorModelForClass(UserModel, Store, Types.STORE);
export default StoreModel;
