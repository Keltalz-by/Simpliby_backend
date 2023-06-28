import { modelOptions, prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { type Store } from '../store/store.model';

enum Plan {
  Free = 'FREE',
  Basic = 'BASIC',
  Pro = 'PRO'
}

@modelOptions({
  schemaOptions: {
    collection: 'subscriptions',
    timestamps: true
  }
})
export class Subscription {
  @prop({ ref: 'Store', type: () => String, required: true })
  public storeId!: Ref<Store>;

  @prop({ default: Plan.Free, enum: Plan })
  public plan: Plan;

  @prop()
  public reference: string;
}

const SubscriptionModel = getModelForClass(Subscription);
export default SubscriptionModel;
