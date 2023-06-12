import { modelOptions, prop, Severity, getModelForClass, Ref } from '@typegoose/typegoose';
import { type User } from '../user/user.model';
import { type Cart } from '../cart/cart.model';

enum Status {
  Pending = 'Pending',
  Reserved = 'Reserved',
  Processing = 'Processing',
  Dispatched = 'Dispatched',
  Cancelled = 'Cancelled',
  Delivered = 'Delivered'
}

enum PaymentMethod {
  CashOnDelivery = 'Cash On Delivery',
  PayWithCard = 'Pay With Card',
  StorePickup = 'Store Pickup'
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
export class Order {
  @prop({ ref: 'User', type: () => String, required: true })
  public owner!: Ref<User>;

  @prop({ ref: 'Cart', type: () => String, required: true })
  public cart!: Ref<Cart>;

  @prop()
  public phone?: String;

  @prop({ default: Status.Pending, enum: Status })
  public status: Status;

  @prop({ default: PaymentMethod.PayWithCard, enum: PaymentMethod })
  public paymentMethod: PaymentMethod;

  @prop()
  public deliveryAddress?: string;

  @prop()
  public state?: string;

  @prop({ default: 'Nigeria' })
  public country?: string;

  @prop()
  public totalPrice?: number;
}

const OrderModel = getModelForClass(Order);
export default OrderModel;
