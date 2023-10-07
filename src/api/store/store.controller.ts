/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Request, type Response, type NextFunction } from 'express';
import { AppError, cloudinary, uploadToCloudinary } from '../../utils';
import { StoreService } from './store.service';
import StoreModel from './store.model';
import { UserService } from '../user/user.service';
import { type SearchStoreInput, type UpdateStoreInput } from './store.schema';
import { type ICreateStore } from './store.interface';
import { APIFeatures } from '../../common';
// import _ from 'lodash';

export class StoreController {
  public storeService = new StoreService();
  public userService = new UserService();
  public apiFeatures = new APIFeatures(StoreModel, {});

  public createStore = async (req: Request<{}, {}, ICreateStore>, res: Response, next: NextFunction) => {
    try {
      const userId: string = res.locals.user._id;
      const storeData: ICreateStore = req.body;

      const allImages = req.files as Express.Multer.File[];

      for (const key of Object.keys(allImages)) {
        if (key === 'storeImage') {
          // @ts-expect-error not really an error
          for (const file of allImages[key]) {
            const path: string = file.path;
            const image = await uploadToCloudinary(path, 'Store-Image');
            storeData.storeImage = image;
          }
        }

        if (key === 'logo') {
          // @ts-expect-error not really an error
          for (const file of allImages[key]) {
            const path: string = file.path;
            const image = await uploadToCloudinary(path, 'Store-Logo');
            storeData.logo = image;
          }
        }
      }

      const store = await this.storeService.createStore({ ...storeData, owner: userId });

      res.status(201).json({
        success: true,
        message: 'Store created successfully.',
        data: store
      });
    } catch (error: any) {
      next(error);
    }
  };

  public updateStore = async (req: Request<{}, {}, UpdateStoreInput>, res: Response, next: NextFunction) => {
    try {
      const storeId: string = res.locals.store._id;
      const update = req.body;
      const allImages = req.files as Express.Multer.File[];

      const store = await this.storeService.findStoreById(storeId);
      const storeImageId = store.storeImage.publicId;
      const storeLogoId = store.logo.publicId;

      if (storeImageId.length > 0) {
        await cloudinary.uploader.destroy(storeImageId);
      }

      if (storeLogoId.length > 0) {
        await cloudinary.uploader.destroy(storeLogoId);
      }

      for (const key of Object.keys(allImages)) {
        if (key === 'storeImage') {
          // @ts-expect-error not really an error
          for (const file of allImages[key]) {
            const path: string = file.path;
            const image = await uploadToCloudinary(path, 'Store-Images');
            update.storeImage = image;
          }
        }

        if (key === 'logo') {
          // @ts-expect-error not really an error
          for (const file of allImages[key]) {
            const path: string = file.path;
            const image = await uploadToCloudinary(path, 'Store-Logos');
            update.logo = image;
          }
        }
      }

      await this.storeService.updateStore({ ...update, storeId });
      res.status(200).json({ success: true, message: 'Store updated successfully' });
    } catch (error: any) {
      next(error);
    }
  };

  public findAllStores = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const stores = await this.storeService.findAllStores();
      console.log(this.apiFeatures);
      res.status(200).json({ success: true, data: stores });
    } catch (err: any) {
      next(err);
    }
  };

  public findStore = async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const storeId = req.params.storeId;

      const store = await this.storeService.findStoreById(storeId);

      if (store === null) {
        next(new AppError(404, 'Store not found'));
      }
    } catch (err: any) {
      next(err);
    }
  };

  public searchStore = async (req: Request<{}, {}, SearchStoreInput>, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body;
      const products = await this.storeService.searchStore(name);

      res.status(200).json({ success: true, data: products });
    } catch (error: any) {
      next(error);
    }
  };
}
