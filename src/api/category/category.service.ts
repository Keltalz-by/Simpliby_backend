import mongoose, { Types } from 'mongoose';
import { AppError } from '../../utils';
import ProductModel, { type Product } from '../product/product.model';
import CategoryModel, { type Category } from './category.model';
import StoreModel from '../store/store.model';

export class CategoryService {
  public async createCategory(categoryData: { storeId: string; categoryName: string }) {
    if (!mongoose.Types.ObjectId.isValid(categoryData.storeId)) {
      throw new AppError(400, 'Invalid store ID.');
    }

    const store = await StoreModel.findOne({ _id: categoryData.storeId });

    if (store === null) {
      throw new AppError(404, 'Store not found.');
    }

    const category = await CategoryModel.findOne({ categoryName: categoryData.categoryName });

    if (category !== null) {
      throw new AppError(409, 'Category already exist.');
    }
    return await CategoryModel.create(categoryData);
  }

  public async getAllCategoriesOfStore(storeId: string): Promise<Category[]> {
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      throw new AppError(400, 'Invalid store ID.');
    }

    const store = await StoreModel.findOne({ _id: storeId });

    if (store === null) {
      throw new AppError(404, 'Store not found.');
    }

    return await CategoryModel.find({ storeId }).populate('storeId', 'businessName');
  }

  public async getProductsInCategory(categoryId: string, storeId: string): Promise<Product[]> {
    if (!Types.ObjectId.isValid(categoryId)) {
      throw new AppError(400, 'Invalid category id');
    }

    if (!Types.ObjectId.isValid(storeId)) {
      throw new AppError(400, 'Invalid store id');
    }

    const category = await CategoryModel.findOne({ _id: categoryId });
    if (category === null) {
      throw new AppError(404, 'Category does not exist');
    }

    const store = await StoreModel.findOne({ _id: storeId });

    if (store === null) {
      throw new AppError(404, 'Store not found.');
    }

    const products = await ProductModel.find({ categoryId, storeId }).populate('categoryId', 'categoryName');

    if (products.length === 0) {
      throw new AppError(404, 'No Products found in category');
    }

    return products;
  }
}
