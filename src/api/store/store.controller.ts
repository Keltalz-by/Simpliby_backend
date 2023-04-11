import { type Request, type Response, type NextFunction } from 'express';
import { AppError, logger } from '../../utils';
import { StoreService } from './store.service';
import { UserService } from '../user/user.service';
// import { type Store } from './store.model';
import { type CreateStoreInput } from './store.schema';

export class StoreController {
  public storeService = new StoreService();
  public userService = new UserService();

  public createStore = async (req: Request<{}, {}, CreateStoreInput>, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user._id;
      const storeData = req.body;

      const store = await this.storeService.createStore({ ...storeData, owner: userId });
      await this.userService.updateUser(userId, { role: 'seller' });

      return res.status(201).json({ success: true, data: store });
    } catch (err: any) {
      next(err);
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

  public updateStore = async (req: Request<{ storeId: string }, {}, {}>, res: Response, next: NextFunction) => {
    try {
      const storeId = req.params.storeId;
      const update = req.body;

      const store = await this.storeService.findStoreById(storeId);

      if (store === null) {
        next(new AppError(404, 'Store not found'));
      }

      const updatedStore = await this.storeService.updateStore(storeId, update);

      logger.info(updatedStore);

      return res.status(200).json({ success: true, message: 'Store updated successfully' });

      // if (checkForClass<Store>(store, Types.STORE)) {
      //     console.log(store.businessName)
      //     return res.status(200).json({ success: true, data: updatedStore })
      // }
    } catch (err: any) {
      next(err);
    }
  };

  public findStore = async (req: Request, res: Response, next: NextFunction) => {
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
}
