import { object, string, type TypeOf } from 'zod';

export const createCategorySchema = object({
  body: object({
    storeId: string({
      required_error: 'Store ID is required'
    }),
    categoryName: string({
      required_error: 'Category name is required'
    })
  })
});

export type CategoryInput = TypeOf<typeof createCategorySchema>['body'];
