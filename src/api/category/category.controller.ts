import { type Request, type Response, type NextFunction } from 'express';
import { AppError } from '../../utils';
import { CategoryService } from './category.service';
import { type CategoryInput } from './category.schema';

export class CategoryController {
  public categoryService = new CategoryService();

  public createCategory = async (req: Request<{}, {}, CategoryInput>, res: Response, next: NextFunction) => {
    try {
      const categoryData = req.body;

      const category = await this.categoryService.createCategory(categoryData);

      res.status(201).json({ data: category });
    } catch (err: any) {
      if (err.code === 11000) {
        next(new AppError(409, 'Category already exist'));
        return;
      }

      next(err);
    }
  };

  public getAllStoreCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storeId } = req.params;
      const categories = await this.categoryService.getAllCategoriesOfStore(storeId);

      res.status(200).json({ success: true, data: categories });
    } catch (err: any) {
      next(err);
    }
  };

  public getAllProductsInCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { categoryId, storeId } = req.params;
      const products = await this.categoryService.getProductsInCategory(categoryId, storeId);
      res.status(200).json({ success: true, data: products });
    } catch (error: any) {
      next(error);
    }
  };
}
