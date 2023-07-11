import { modelOptions, prop, Severity, getModelForClass, Ref } from '@typegoose/typegoose';
import { type Order } from '../order/order.model';

enum Status {
  Pending = 'Pending',
  Success = 'Success',
  Failed = 'Failed'
}

@modelOptions({
  schemaOptions: {
    collection: 'payments',
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class Payment {
  @prop({ required: true })
  public owner!: string;

  @prop({ ref: 'Order', type: () => String, required: true })
  public order!: Ref<Order>;

  @prop()
  public bill: number;

  @prop({ default: Status.Pending, enum: Status })
  public status: Status;

  @prop()
  public reference: string;
}

const PaymentModel = getModelForClass(Payment);
export default PaymentModel;
