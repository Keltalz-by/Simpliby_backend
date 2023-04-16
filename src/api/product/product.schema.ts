import { object, string, type TypeOf, any } from 'zod';

const payload = {
  body: object({
    store: string({
      required_error: 'Store is required'
    }),
    category: string({
      required_error: 'Product category is required'
    }),
    productName: string({
      required_error: 'Product name is required'
    }),
    description: string({
      required_error: 'Product description is required'
    }),
    price: string({
      required_error: 'Price is required'
    }),
    reservationPrice: string({
      required_error: 'Reservation price is required'
    }),
    currency: string().optional(),
    itemLocation: string().optional(),
    inStock: string().optional(),
    productImages: any(),
    productRackImage: any().optional()
  })
};

export const createProductSchema = object({
  ...payload
});

export type CreateProductInput = TypeOf<typeof createProductSchema>['body'];
