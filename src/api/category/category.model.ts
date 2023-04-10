import { modelOptions, prop, Severity, getModelForClass } from '@typegoose/typegoose';

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
  @prop({ required: true, unique: true })
  public categoryName: string;
}

const CategoryModel = getModelForClass(Category);
export default CategoryModel;
