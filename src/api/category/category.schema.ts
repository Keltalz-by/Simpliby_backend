import { object, string, type TypeOf } from 'zod';

export const createCategorySchema = object({
  body: object({
    categoryName: string({
      required_error: 'Category name is required'
    })
  })
});

export type CategoryInput = TypeOf<typeof createCategorySchema>['body'];
