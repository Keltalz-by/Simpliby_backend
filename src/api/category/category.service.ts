import { Types } from 'mongoose';
import { AppError } from '../../utils';
import ProductModel, { type Product } from '../product/product.model';
import CategoryModel, { type Category } from './category.model';

export class CategoryService {
  public async createCategory(categoryData: Category) {
    return await CategoryModel.create(categoryData);
  }

  public async getAllCategory(): Promise<Category[]> {
    return await CategoryModel.find({});
  }

  public async getProductsInCategory(categoryId: string): Promise<Product[]> {
    if (!Types.ObjectId.isValid(categoryId)) {
      throw new AppError(400, 'Invalid category id');
    }

    const category = await CategoryModel.findOne({ _id: categoryId });
    if (category === null) {
      throw new AppError(404, 'Category does not exist');
    }

    const products = await ProductModel.find({ categoryId }).populate('categoryId', 'categoryName');

    if (products.length === 0) {
      throw new AppError(404, 'No Products found in category');
    }

    return products;
  }
}
