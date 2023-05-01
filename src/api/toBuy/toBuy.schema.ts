import { boolean, object, string, type TypeOf } from 'zod';

export const createToBuySchema = object({
  body: object({
    title: string({
      required_error: 'Title is required'
    }),
    isCompleted: boolean().optional()
  })
});

export type ToBuyInput = TypeOf<typeof createToBuySchema>['body'];
