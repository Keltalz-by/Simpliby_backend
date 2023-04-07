import { object, string, number, type TypeOf } from 'zod';

const payload = {
  body: object({
    productName: string({
      required_error: 'Product name is required'
    }),
    description: string({
      required_error: 'Product description is required'
    }),
    price: number({
      required_error: 'Price is required'
    })
  })
};

export const createProductSchema = object({
  ...payload
});

export type CreateProductInput = TypeOf<typeof createProductSchema>['body'];
