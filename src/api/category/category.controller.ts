import { type Request, type Response, type NextFunction } from 'express';
import { AppError } from '../../utils';
import { CategoryService } from './category.service';
import { type CategoryInput } from './category.schema';

export class CategoryController {
  public categoryService = new CategoryService();

  public createCategory = async (req: Request<{}, {}, CategoryInput>, res: Response, next: NextFunction) => {
    try {
      const categoryData = req.body;
      console.log(req.hostname);

      const category = await this.categoryService.createCategory(categoryData);

      return res.status(201).json({ data: category });
    } catch (err: any) {
      if (err.code === 11000) {
        next(new AppError(409, 'Category already exist'));
        return;
      }

      next(err);
    }
  };

  public getAllCategory = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.categoryService.getAllCategory();

      return res.status(200).json({ success: true, data: categories });
    } catch (err: any) {
      next(err);
    }
  };

  public getAllProductsInCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { categoryId } = req.params;
      const products = await this.categoryService.getProductsInCategory(categoryId);
      return res.status(200).json({ success: true, data: products });
    } catch (error: any) {
      next(error);
    }
  };
}
