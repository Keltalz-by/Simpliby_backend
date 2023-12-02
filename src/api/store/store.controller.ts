/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Request, type Response, type NextFunction } from 'express';
import { cloudinary, uploadToCloudinary } from '../../utils';
import { StoreService } from './store.service';
// import StoreModel from './store.model';
import { UserService } from '../user/user.service';
import { type UpdateStoreInput, type CreateStoreInput, type SearchStoreInput } from './store.schema';
// import { type ICreateStore } from './store.interface';
// import { type ICreateStore } from './store.interface';
// import { APIFeatures } from '../../common';
// import _ from 'lodash';

export class StoreController {
  private readonly storeService = new StoreService();
  private readonly userService = new UserService();
  // public apiFeatures = new APIFeatures(StoreModel, {});

  public createStore = async (req: Request<{}, {}, CreateStoreInput>, res: Response, next: NextFunction) => {
    try {
      const owner: string = res.locals.user.id;
      const storeData = req.body;

      const files = req.files as Express.Multer.File[];

      console.log(storeData);
      console.log('owner', owner);

      console.log(files);

      for (const key of Object.keys(files)) {
        if (key === 'storeImage') {
          // @ts-expect-error not really an error
          for (const file of files[key]) {
            const path: string = file.path;
            const storeImage = await uploadToCloudinary(path, 'Store-Image');
            storeData.storeImage = storeImage;
          }
        }

        if (key === 'logo') {
          // @ts-expect-error not really an error
          for (const file of files[key]) {
            const path: string = file.path;
            const logoImage = await uploadToCloudinary(path, 'Logo-Image');
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
    } catch (error: any) {
      next(error);
    }
  };

  public updateStore = async (req: Request<{}, {}, UpdateStoreInput>, res: Response, next: NextFunction) => {
    try {
      const userId: string = res.locals.user._id;
      const update = req.body;
      const allImages = req.files as Express.Multer.File[];

      const store = await this.storeService.findStore({ owner: userId });
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

      await this.storeService.updateStore({ ...update, userId });
      res.status(200).json({ success: true, message: 'Store updated successfully' });
    } catch (error: any) {
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

  public findAllStores = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stores = await this.storeService.findAllStores();

      res.status(200).json({ success: true, data: stores });
    } catch (err: any) {
      next(err);
    }
  };

  public findStore = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const storeId = req.params.storeId;

      const store = await this.storeService.findStoreById(storeId);

      res.status(200).json({ success: true, data: store });
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
