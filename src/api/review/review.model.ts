import { modelOptions, prop, Severity, getModelForClass, Ref } from '@typegoose/typegoose';
import { Store } from '../store/store.model';
import { User } from '../user/user.model';

@modelOptions({
  schemaOptions: {
    collection: 'review',
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class Review {
  @prop({ ref: () => Store, required: true })
  public store!: Ref<Store>;

  @prop({ ref: () => User, required: true })
  public user!: Ref<User>;

  @prop({ required: true, min: 1, max: 5 })
  public rating!: number;

  @prop()
  public comment?: string;
}

const ReviewModel = getModelForClass(Review);
export default ReviewModel;
