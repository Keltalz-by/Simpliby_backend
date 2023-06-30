import { modelOptions, prop, Severity, getModelForClass, Ref } from '@typegoose/typegoose';
import { type User } from '../user/user.model';

enum Status {
  Pending = 'Pending',
  Paid = 'Paid',
  Reserved = 'Reserved',
  Processing = 'Processing',
  Dispatched = 'Dispatched',
  Cancelled = 'Cancelled',
  Delivered = 'Delivered'
}

@modelOptions({
  schemaOptions: {
    collection: 'orders',
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
class OrderItem {
  @prop({ required: true })
  public productId!: string;

  @prop({ required: true, default: 1, min: 1 })
  public quantity!: number;

  @prop({ default: 0 })
  public price: number;
}

export class Order {
  @prop({ ref: 'User', type: () => String, required: true })
  public owner!: Ref<User>;

  @prop({ required: true })
  public items!: OrderItem[];

  @prop({ default: Status.Pending, enum: Status })
  public status: Status;

  @prop({ default: 0 })
  public totalPrice: number;

  @prop()
  public storeId: string;
}

const OrderModel = getModelForClass(Order);
export default OrderModel;
