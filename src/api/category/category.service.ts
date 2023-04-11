import CategoryModel, { type Category } from './category.model';

export class CategoryService {
  public async createCategory(categoryData: Category) {
    return await CategoryModel.create(categoryData);
  }
}
