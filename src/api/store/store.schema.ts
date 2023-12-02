import { any, object, string, type TypeOf } from 'zod';

export const createStoreSchema = object({
  body: object({
    businessName: string({
      required_error: 'Business Name is required'
    }),
    businessLocation: string({
      required_error: 'Business Location is required'
    }),
    description: string({
      required_error: 'Description is required'
    }),
    address: string({
      required_error: 'Address is required'
    }),
    city: string({
      required_error: 'City is required'
    }),
    country: string({
      required_error: 'Country is required'
    }),
    storeImage: any({
      required_error: 'Upload an image of your store'
    }),
    logo: any({
      required_error: 'Upload your store logo'
    })
  })
});

const params = {
  params: object({
    storeId: string({
      required_error: 'Store ID is required.'
    })
  })
};

export const verifyStoreSchema = object({
  ...params
});

export const updateStoreSchema = object({
  body: object({
    businessName: string(),
    businessLocation: string(),
    description: string({
      required_error: 'Description is required'
    }),
    address: string({
      required_error: 'Address is required'
    }),
    city: string({
      required_error: 'City is required'
    }),
    country: string({
      required_error: 'Country is required'
    }),
    storeImage: any({
      required_error: 'Upload an image of your store'
    }),
    logo: any({
      required_error: 'Upload your store logo'
    })
  })
});

export const searchStoreSchema = object({
  body: object({
    name: string({
      required_error: 'Store Name is required'
    }).min(1, 'Please provide a store name')
  })
});

export type CreateStoreInput = TypeOf<typeof createStoreSchema>['body'];
export type VerifyStoreInput = TypeOf<typeof verifyStoreSchema>['params'];
export type UpdateStoreInput = TypeOf<typeof updateStoreSchema>['body'];
export type SearchStoreInput = TypeOf<typeof searchStoreSchema>['body'];
