import { Severity, getModelForClass, modelOptions, prop, Ref, pre } from '@typegoose/typegoose';
import { IGallery } from '../../common';
import { User } from '../user/user.model';

@pre<Store>('save', function (next) {
  this.id = this._id;
  next();
})
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
  @prop()
  id: string;

  @prop({ ref: () => User, required: true })
  owner: Ref<User>;

  @prop({ required: true, unique: true })
  businessName: string;

  @prop({ required: true })
  businessLocation: string;

  @prop()
  phone: string;

  @prop()
  description: string;

  @prop()
  address: string;

  @prop()
  city: string;

  @prop({ default: 'Nigeria' })
  country: string;

  @prop()
  storeImage: IGallery;

  @prop()
  logo: IGallery;

  @prop()
  website: string;

  @prop()
  businessHours: string;

  @prop({ default: [] })
  followers: string[];

  @prop({ default: false })
  isStoreVerified: boolean;

  @prop({ default: 0 })
  amountSold: number;

  @prop({ default: [] })
  buyersVisited: string[];

  @prop({ default: [] })
  numberOfTimesVisited: string[];
}

const StoreModel = getModelForClass(Store);
export default StoreModel;
