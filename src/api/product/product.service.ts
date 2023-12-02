import { type IProduct } from './product.interface';
import { AppError } from '../../utils';
import CategoryModel from '../category/category.model';
import StoreModel from '../store/store.model';
import ProductModel, { type Product } from './product.model';
import { type QueryObj } from '../../common';
import { Types } from 'mongoose';

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

    return await (
      await (await ProductModel.create(productData)).populate('categoryId', 'categoryName')
    ).populate('storeId', 'businessName');
  }

  public async getAllProducts(query: QueryObj): Promise<Product[]> {
    const page = parseInt(query.page) * 1 ?? 1;
    const limit = parseInt(query.limit) * 1 ?? 6;
    const skip = (page - 1) * limit;

    const products = await ProductModel.find().limit(limit).skip(skip);

    return products;
    // const features = (await (await new APIFeatures(ProductModel, query).filter()).sort()).limitFields()
  }

  public async getAllProductsInCategory(): Promise<Product[]> {
    const products = await ProductModel.find();

    return products;
  }

  public async totalProductsNumber(): Promise<number> {
    return await ProductModel.countDocuments();
  }

  public async getSingleProduct(productId: string): Promise<Product> {
    if (!Types.ObjectId.isValid(productId)) {
      throw new AppError(400, 'Invalid product id');
    }

    const product = await ProductModel.findOne({ _id: productId });

    if (product === null) {
      throw new AppError(404, 'Product does not exist');
    }

    return product;
  }

  public async deleteProduct(productId: string, userId: string): Promise<Product> {
    if (!Types.ObjectId.isValid(productId)) {
      throw new AppError(400, 'Invalid product id');
    }

    const product = await ProductModel.findOne({ _id: productId });

    if (product === null) {
      throw new AppError(404, 'Product does not exist');
    }

    const store = await StoreModel.findOne({ _id: product.storeId });

    if (store === null) {
      throw new AppError(404, 'Product does not belong to store');
    }

    if (String(store.owner) !== String(userId)) {
      throw new AppError(403, 'Store cannot delete product');
    }

    return await product.deleteOne();
  }
}
