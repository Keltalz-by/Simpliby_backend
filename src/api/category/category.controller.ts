import { type Request, type Response, type NextFunction } from 'express';
import { AppError } from '../../utils';
import { CategoryService } from './category.service';
import { type CategoryInput } from './category.schema';

const categoryService = new CategoryService();

export class CategoryController {
  public createCategory = async (req: Request<{}, {}, CategoryInput>, res: Response, next: NextFunction) => {
    try {
      const categoryData = req.body;
      console.log(req.hostname);

      const category = await categoryService.createCategory(categoryData);

      return res.status(201).json({ data: category });
    } catch (err: any) {
      if (err.code === 11000) {
        next(new AppError(409, 'Category already exist'));
        return;
      }

      next(err);
    }
  };
}
