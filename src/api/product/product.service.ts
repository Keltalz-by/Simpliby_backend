// import { AppError } from '../../utils';
// import CategoryModel from '../category/category.model';
// import StoreModel from '../store/store.model';
// import ProductModel, { type Product } from './product.model';

// export class ProductService {
//   public async createProduct(productData: Partial<Product>) {
//     const category = await CategoryModel.findOne({ _id: productData.categoryId });
//     const store = await StoreModel.findOne({ _id: productData.storeId });

//     if (category === null) {
//       throw new AppError(404, 'Category does not exist');
//     }

//     if (store === null) {
//       throw new AppError(404, 'Store does not exist');
//     }

//     if (productData.productImages.length === 0) {
//       throw new AppError(400, 'Product Images are required');
//     }

//     return await (
//       await (await ProductModel.create(productData)).populate('categoryId', 'categoryName')
//     ).populate('storeId', 'businessName');
//   }
// }
