import { Severity, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { IGallery } from '../../common';
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
  @prop({ ref: 'User', type: () => String, required: true })
  public owner: Ref<User>;

  @prop({ required: true, unique: true })
  public businessName: string;

  @prop({ required: true })
  public businessLocation: string;

  @prop()
  public phone: string;

  @prop()
  public description: string;

  @prop()
  public address: string;

  @prop()
  public city: string;

  @prop({ default: 'Nigeria' })
  public country: string;

  @prop()
  public storeImage: IGallery;

  @prop()
  public logo: IGallery;

  @prop()
  public website: string;

  @prop()
  public businessHours: string;

  @prop({ default: [] })
  public followers: string[];

  @prop({ default: false })
  public isStoreVerified: boolean;

  @prop({ default: 0 })
  public amountSold: number;

  @prop({ default: 'FREE' })
  public plan: string;

  @prop({ default: [] })
  public buyersVisited: string[];

  @prop({ default: [] })
  public numberOfTimesVisited: string[];
}

const StoreModel = getModelForClass(Store);
export default StoreModel;
