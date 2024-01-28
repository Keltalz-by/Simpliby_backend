"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
const utils_1 = require("../../utils");
const store_service_1 = require("./store.service");
// import StoreModel from './store.model';
const user_service_1 = require("../user/user.service");
// import { type ICreateStore } from './store.interface';
// import { type ICreateStore } from './store.interface';
// import { APIFeatures } from '../../common';
// import _ from 'lodash';
class StoreController {
    constructor() {
        this.storeService = new store_service_1.StoreService();
        this.userService = new user_service_1.UserService();
        // public apiFeatures = new APIFeatures(StoreModel, {});
        this.createStore = async (req, res, next) => {
            try {
                console.log(req);
                const owner = res.locals.user.id;
                const storeData = req.body;
                const files = req.files;
                console.log(storeData);
                console.log('owner', owner);
                console.log(files);
                for (const key of Object.keys(files)) {
                    if (key === 'storeImage') {
                        // @ts-expect-error not really an error
                        for (const file of files[key]) {
                            const path = file.path;
                            const storeImage = await (0, utils_1.uploadToCloudinary)(path, 'Store-Image');
                            storeData.storeImage = storeImage;
                        }
                    }
                    if (key === 'logo') {
                        // @ts-expect-error not really an error
                        for (const file of files[key]) {
                            const path = file.path;
                            const logoImage = await (0, utils_1.uploadToCloudinary)(path, 'Logo-Image');
                            storeData.logo = logoImage;
                        }
                    }
                }
                console.log(storeData);
                const store = await this.storeService.createStore(storeData, owner);
                res.status(201).json({
                    success: true,
                    message: 'Store created successfully.',
                    data: store
                });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateStore = async (req, res, next) => {
            try {
                const userId = res.locals.user._id;
                const update = req.body;
                const allImages = req.files;
                const store = await this.storeService.findStore({ owner: userId });
                const storeImageId = store.storeImage.publicId;
                const storeLogoId = store.logo.publicId;
                if (storeImageId.length > 0) {
                    await utils_1.cloudinary.uploader.destroy(storeImageId);
                }
                if (storeLogoId.length > 0) {
                    await utils_1.cloudinary.uploader.destroy(storeLogoId);
                }
                for (const key of Object.keys(allImages)) {
                    if (key === 'storeImage') {
                        // @ts-expect-error not really an error
                        for (const file of allImages[key]) {
                            const path = file.path;
                            const image = await (0, utils_1.uploadToCloudinary)(path, 'Store-Images');
                            update.storeImage = image;
                        }
                    }
                    if (key === 'logo') {
                        // @ts-expect-error not really an error
                        for (const file of allImages[key]) {
                            const path = file.path;
                            const image = await (0, utils_1.uploadToCloudinary)(path, 'Store-Logos');
                            update.logo = image;
                        }
                    }
                }
                await this.storeService.updateStore(Object.assign(Object.assign({}, update), { userId }));
                res.status(200).json({ success: true, message: 'Store updated successfully' });
            }
            catch (error) {
                next(error);
            }
        };
        // public findAllStores = async (_req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     const stores = await this.storeService.findAllStores();
        //     // console.log(this.apiFeatures);
        //     res.status(200).json({ success: true, data: stores });
        //   } catch (err: any) {
        //     next(err);
        //   }
        // };
        this.findAllStores = async (req, res, next) => {
            try {
                const stores = await this.storeService.findAllStores();
                res.status(200).json({ success: true, data: stores });
            }
            catch (err) {
                next(err);
            }
        };
        this.findStore = async (req, res, next) => {
            try {
                const storeId = req.params.storeId;
                const store = await this.storeService.findStoreById(storeId);
                res.status(200).json({ success: true, data: store });
            }
            catch (err) {
                next(err);
            }
        };
        this.searchStore = async (req, res, next) => {
            try {
                const { name } = req.body;
                const products = await this.storeService.searchStore(name);
                res.status(200).json({ success: true, data: products });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.StoreController = StoreController;
//# sourceMappingURL=store.controller.js.map