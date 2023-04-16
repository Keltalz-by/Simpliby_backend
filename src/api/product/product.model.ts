import { modelOptions, prop, Severity, getModelForClass, Ref } from '@typegoose/typegoose';
import { Category } from '../category/category.model';
import { Store } from '../store/store.model';

@modelOptions({
  schemaOptions: {
    collection: 'products',
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class Product {
  @prop({ ref: () => Store, required: true })
  public store: Ref<Store>;

  @prop({ ref: () => Category, required: true })
  public category: Ref<Category>;

  @prop({ required: true })
  public productName: string;

  @prop({ required: true })
  public description: string;

  @prop()
  public itemLocation?: string;

  @prop({ default: 'NGN (Naira)' })
  public currency?: string;

  @prop({ default: 0, required: true })
  public price: string;

  @prop()
  public reservationPrice: string;

  @prop({ required: true })
  public productImages: [];

  @prop()
  public productRackImage?: object;

  @prop({ default: true })
  public inStock?: boolean;
}

const ProductModel = getModelForClass(Product);
export default ProductModel;
