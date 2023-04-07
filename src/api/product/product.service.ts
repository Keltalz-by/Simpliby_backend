import ProductModel, { type Product } from './product.model';

export class ProductService {
  public async createProduct(productData: Partial<Product>) {
    return await (
      await (await ProductModel.create(productData)).populate('category', 'categoryName')
    ).populate('store', 'businessName');
  }
}
