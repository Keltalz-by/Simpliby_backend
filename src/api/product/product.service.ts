import { type IProduct } from './product.interface';
import { AppError } from '../../utils';
import CategoryModel from '../category/category.model';
import StoreModel from '../store/store.model';
import ProductModel, { type Product } from './product.model';

// type QueryObj = Record<string, string
export class ProductService {
  public async createProduct(productData: IProduct): Promise<Product> {
    const category = await CategoryModel.findOne({ _id: productData.categoryId });
    const store = await StoreModel.findOne({ _id: productData.storeId });

    if (category === null) {
      throw new AppError(404, 'Category does not exist');
    }

    if (store === null) {
      throw new AppError(404, 'Store does not exist');
    }

    if (productData.productImages.length === 0) {
      throw new AppError(400, 'Product Images are required');
    }

    return await (
      await (await ProductModel.create(productData)).populate('categoryId', 'categoryName')
    ).populate('storeId', 'businessName');
  }

  public async getAllProducts(query: any): Promise<Product[]> {
    const page = parseInt(query.page) * 1 ?? 1;
    const limit = parseInt(query.limit) * 1 ?? 6;
    const skip = (page - 1) * limit;
    return await ProductModel.find({})
      .skip(skip)
      .limit(limit)
      .populate('storeId', 'businessName')
      .populate('categoryId', 'categoryName');
  }

  public async getAllProductsInCategory(): Promise<Product[]> {
    const products = await ProductModel.find();

    return products;
  }

  public async totalProductsNumber(): Promise<number> {
    return await ProductModel.countDocuments();
  }
}
