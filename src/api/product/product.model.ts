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
  @prop({ ref: () => Category, required: true })
  public categoryId: Ref<Category>;

  @prop({ ref: () => Store, required: true })
  public storeId: Ref<Store>;

  @prop({ required: true })
  public productName: string;

  @prop({ required: true })
  public description: string;

  @prop()
  public itemLocation: string;

  @prop({ default: 'NGN (Naira)' })
  public currency: string;

  @prop({ default: 0, required: true })
  public price: number;

  @prop()
  public reservationPrice: number;

  @prop()
  public productImages: string[];

  @prop()
  public productRackImage: string;

  @prop({ default: true })
  public inStock: boolean;
}

const ProductModel = getModelForClass(Product);
export default ProductModel;
