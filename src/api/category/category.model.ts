import { modelOptions, prop, Severity, getModelForClass, Ref } from '@typegoose/typegoose';
import { Store } from '../store/store.model';

@modelOptions({
  schemaOptions: {
    collection: 'category',
    timestamps: true
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
export class Category {
  @prop({ ref: () => Store, required: true })
  public storeId: Ref<Store>;

  @prop({ required: true, unique: true })
  public categoryName: string;
}

const CategoryModel = getModelForClass(Category);
export default CategoryModel;
