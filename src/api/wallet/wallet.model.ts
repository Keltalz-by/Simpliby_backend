import { modelOptions, prop, Severity, getModelForClass, Ref } from '@typegoose/typegoose';
import { type Store } from '../store/store.model';

@modelOptions({
  schemaOptions: {
    collection: 'wallets',
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class Wallet {
  @prop({ ref: 'Store', type: () => String, required: true })
  public storeId!: Ref<Store>;

  @prop({ default: 0 })
  public balance: number;

  @prop({ default: 0 })
  public amountWithdrawn: number;
}

const WalletModel = getModelForClass(Wallet);
export default WalletModel;
