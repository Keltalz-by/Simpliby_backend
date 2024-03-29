import { object, string, type TypeOf, any } from 'zod';

const payload = {
  body: object({
    storeId: string({
      required_error: 'Store is required'
    }),
    categoryId: string({
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
    productImages: any({
      required_error: 'Product Images are required'
    }),
    productRackImage: any().optional()
  })
};

export const createProductSchema = object({
  ...payload
});

export type CreateProductInput = TypeOf<typeof createProductSchema>['body'];
