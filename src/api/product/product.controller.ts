/* eslint-disable @typescript-eslint/dot-notation */
import { type Request, type Response, type NextFunction } from 'express';
import { ProductService } from './product.service';
import { StoreService } from '../store/store.service';
// import { type CreateProductInput } from './product.schema';
import { uploadToCloudinary } from '../../utils';
import { type IProduct } from './product.interface';

export class ProductController {
  public productService = new ProductService();
  public storeService = new StoreService();

  public createProduct = async (req: Request<{}, {}, IProduct>, res: Response, next: NextFunction) => {
    try {
      const productData: IProduct = req.body;
      const allImages = req.files as Express.Multer.File[];

      productData.productImages = [];

      for (const key of Object.keys(allImages)) {
        if (key === 'productImages') {
          // @ts-expect-error not really an error
          for (const file of allImages[key]) {
            const path: string = file.path;
            const images = await uploadToCloudinary(path, 'Product-Images');
            productData.productImages.push(images);
          }
        }

        if (key === 'productRackImage') {
          // @ts-expect-error not really an error
          for (const file of allImages[key]) {
            const path: string = file.path;
            const image = await uploadToCloudinary(path, 'Product-Rack-Images');
            productData.productRackImage = image;
          }
        }
      }
      const product = await this.productService.createProduct(productData);

      return res.status(201).json({ message: 'Product created successfully', success: true, data: product });
    } catch (err: any) {
      next(err);
    }
  };

  public getAllCategoryProducts = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await this.productService.getAllProductsInCategory();

      res.status(200).json({ count: products.length, success: true, data: products });
    } catch (err: any) {
      next(err);
    }
  };

  public getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page, limit } = req.query as any;
      const products = await this.productService.getAllProducts({ page, limit });

      res.status(200).json({ success: true, data: products, count: products.length });
    } catch (err: any) {
      next(err);
    }
  };
}
