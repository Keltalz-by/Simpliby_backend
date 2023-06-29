/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Request, type Response, type NextFunction } from 'express';
import { AppError, cloudinary, uploadToCloudinary } from '../../utils';
import { StoreService } from './store.service';
import { UserService } from '../user/user.service';
// import { type Store } from './store.model';
import { type SearchStoreInput, type VerifyStoreInput, type UpdateStoreInput } from './store.schema';
import { type ICreateStore } from './store.interface';
// import _ from 'lodash';

export class StoreController {
  public storeService = new StoreService();
  public userService = new UserService();

  public createStore = async (req: Request<{}, {}, ICreateStore>, res: Response, next: NextFunction) => {
    try {
      const userId: string = res.locals.user._id;
      console.log(userId);
      const storeData: ICreateStore = req.body;

      console.log(storeData);

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

  public verifyStore = async (req: Request<VerifyStoreInput>, res: Response, next: NextFunction) => {
    try {
      const { storeId } = req.params;
      await this.storeService.verifyStore(storeId);

      res.status(200).json({ status: true, message: 'Store verified successfully.' });
    } catch (error: any) {
      next(error);
    }
  };

  public followUser = async (req: Request<{ userId: string }, {}, {}>, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const user = res.locals.user;

      const store = await this.storeService.findStore({ owner: user._id });

      if (store === null) {
        next(new AppError(404, 'Store not found'));
        return;
      }

      await this.storeService.followUser(userId, String(store._id));
      res.status(200).json({ status: true, message: 'User followed successfully' });
    } catch (error: any) {
      next(error);
    }
  };

  public unfollowUser = async (req: Request<{ userId: string }, {}, {}>, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const storeId: string = res.locals.store._id;

      await this.storeService.unfollowUser(userId, storeId);
      res.status(200).json({ status: true, message: 'User unfollowed successfully' });
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
            const images = await uploadToCloudinary(path, 'Store-Images');
            update.storeImages.push(images);
          }
        }

        if (key === 'logo') {
          // @ts-expect-error not really an error
          for (const file of allImages[key]) {
            const path: string = file.path;
            const image = await uploadToCloudinary(path, 'Store-Logo');
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
      return res.status(200).json({ success: true, data: stores });
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

      return res.status(200).json({ success: true, data: products });
    } catch (error: any) {
      next(error);
    }
  };
}
