import { type Request, type Response, type NextFunction } from 'express';
import { ProductService } from './product.service';
import { type CreateProductInput } from './product.schema';

const productService = new ProductService();

export class ProductController {
  public createProduct = async (req: Request<{}, {}, CreateProductInput>, res: Response, next: NextFunction) => {
    try {
      const productData = req.body;

      const product = await productService.createProduct(productData);

      return res.status(201).json({ success: true, data: product });
    } catch (err: any) {
      next(err);
    }
  };
}
