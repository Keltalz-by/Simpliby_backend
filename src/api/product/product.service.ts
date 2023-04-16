import { type IProduct } from './product.interface';
import { AppError } from '../../utils';
import CategoryModel from '../category/category.model';
import StoreModel from '../store/store.model';
import ProductModel, { type Product } from './product.model';

export class ProductService {
  public async createProduct(productData: IProduct): Promise<Product> {
    const category = await CategoryModel.findOne({ _id: productData.category });
    const store = await StoreModel.findOne({ _id: productData.store });

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
      await (await ProductModel.create(productData)).populate('category', 'categoryName')
    ).populate('store', 'businessName');
  }

  public async getAllProducts(): Promise<Product[]> {
    return await ProductModel.find().populate('store', 'businessName').populate('category', 'categoryName');
  }

  public async getAllProductsInCategory(query: string): Promise<Product[]> {
    const products = await ProductModel.find({ productName: { $regex: query, $options: 'i' } });

    return products;
  }
}
