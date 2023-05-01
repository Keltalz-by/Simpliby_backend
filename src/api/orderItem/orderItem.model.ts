import { Ref, Severity, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Product } from '../product/product.model';

@modelOptions({
  schemaOptions: {
    collection: 'orderItems',
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class OrderItem {
  @prop({ ref: () => Product, type: () => String, required: true })
  public product: Ref<Product>;

  @prop({ required: true, default: 1 })
  public quantity: number;
}

const OrderItemModel = getModelForClass(OrderItem);
export default OrderItemModel;
