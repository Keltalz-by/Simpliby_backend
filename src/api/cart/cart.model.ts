import { modelOptions, prop, Severity, getModelForClass, Ref } from '@typegoose/typegoose';
import { type User } from '../user/user.model';

@modelOptions({
  schemaOptions: {
    collection: 'cart',
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
class CartItem {
  @prop({ required: true })
  public product!: string;

  @prop({ required: true, default: 1, min: 1 })
  public quantity!: number;

  @prop({ default: 0 })
  public price: number;
}
export class Cart {
  @prop({ ref: 'User', type: () => String, required: true })
  public owner!: Ref<User>;

  @prop({ required: true })
  public items!: CartItem[];

  @prop({ required: true, default: 0 })
  public totalPrice!: number;
}

const CartModel = getModelForClass(Cart);
export default CartModel;
