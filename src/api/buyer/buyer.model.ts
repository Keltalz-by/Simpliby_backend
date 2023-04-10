import { getDiscriminatorModelForClass, prop } from '@typegoose/typegoose';
import UserModel, { User, Types } from '../user/user.model';

export class Buyer extends User {
  @prop()
  public occupation: string;
}

const BuyerModel = getDiscriminatorModelForClass(UserModel, Buyer, Types.BUYER);
export default BuyerModel;
