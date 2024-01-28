"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchStoreSchema = exports.updateStoreSchema = exports.verifyStoreSchema = exports.createStoreSchema = void 0;
const zod_1 = require("zod");
exports.createStoreSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        businessName: (0, zod_1.string)({
            required_error: 'Business Name is required'
        }),
        businessLocation: (0, zod_1.string)({
            required_error: 'Business Location is required'
        }),
        description: (0, zod_1.string)({
            required_error: 'Description is required'
        }),
        address: (0, zod_1.string)({
            required_error: 'Address is required'
        }),
        city: (0, zod_1.string)({
            required_error: 'City is required'
        }),
        country: (0, zod_1.string)({
            required_error: 'Country is required'
        }),
        storeImage: (0, zod_1.any)({
            required_error: 'Upload an image of your store'
        }),
        logo: (0, zod_1.any)({
            required_error: 'Upload your store logo'
        })
    })
});
const params = {
    params: (0, zod_1.object)({
        storeId: (0, zod_1.string)({
            required_error: 'Store ID is required.'
        })
    })
};
exports.verifyStoreSchema = (0, zod_1.object)(Object.assign({}, params));
exports.updateStoreSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        businessName: (0, zod_1.string)(),
        businessLocation: (0, zod_1.string)(),
        description: (0, zod_1.string)({
            required_error: 'Description is required'
        }),
        address: (0, zod_1.string)({
            required_error: 'Address is required'
        }),
        city: (0, zod_1.string)({
            required_error: 'City is required'
        }),
        country: (0, zod_1.string)({
            required_error: 'Country is required'
        }),
        storeImage: (0, zod_1.any)({
            required_error: 'Upload an image of your store'
        }),
        logo: (0, zod_1.any)({
            required_error: 'Upload your store logo'
        })
    })
});
exports.searchStoreSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Store Name is required'
        }).min(1, 'Please provide a store name')
    })
});
//# sourceMappingURL=store.schema.js.map