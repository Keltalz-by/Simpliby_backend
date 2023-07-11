/* eslint-disable @typescript-eslint/restrict-plus-operands */
import * as mongoose from 'mongoose';
import { AppError, sendMail, storeVerifiedTemplate } from '../../utils';
import StoreModel from '../store/store.model';
import { type ICreateStore, type IStore, type IUpdateStore } from './store.interface';
import UserModel from '../user/user.model';

export class StoreService {
  public async createStore(storeData: ICreateStore): Promise<IStore> {
    if (!mongoose.Types.ObjectId.isValid(storeData.owner)) {
      throw new AppError(400, 'Invalid user ID.');
    }

    const user = await UserModel.findOne({ _id: storeData.owner });
    const store = await StoreModel.findOne({ businessName: storeData.businessName });

    if (user === null) {
      throw new AppError(404, `User with ID ${storeData.owner} does not exist`);
    }

    if (store !== null) {
      throw new AppError(409, `Store with business name ${storeData.businessName} already exist`);
    }

    const newStore = await (await StoreModel.create(storeData)).populate('owner', 'name');

    if (user.role !== 'seller') {
      await user.updateOne({ $set: { role: 'seller' } });
    }

    return newStore;
  }

  public async verifyStore(storeId: string) {
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      throw new AppError(400, 'Invalid store ID.');
    }
    const store = await StoreModel.findOne({ _id: storeId });

    if (store === null) {
      throw new AppError(404, 'Store not found.');
    }

    const user = await UserModel.findOne({ _id: store.owner });

    if (user === null) {
      throw new AppError(404, 'User not found.');
    }

    if (store.isStoreVerified) {
      throw new AppError(400, 'Store already verified.');
    }

    await StoreModel.updateOne(
      { _id: storeId },
      {
        $set: { isStoreVerified: true }
      }
    );

    const message = storeVerifiedTemplate(store.businessName);
    return await sendMail(user.email, 'Store Verification Successful', message);
  }

  public async updateStore(storeData: IUpdateStore) {
    if (!mongoose.Types.ObjectId.isValid(storeData.storeId)) {
      throw new AppError(400, 'Invalid store ID.');
    }

    return await StoreModel.updateOne({ _id: storeData.storeId }, { $set: storeData });
  }

  public async findStore(option: object) {
    return await StoreModel.findOne(option);
  }

  public async findStoreById(storeId: string) {
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      throw new AppError(400, 'Invalid store ID.');
    }

    const store = await StoreModel.findOne({ _id: storeId });

    if (store === null) {
      throw new AppError(404, 'Store not found.');
    }
    return store;
  }

  public async findAllStores() {
    return await StoreModel.find({}).orFail().exec();
  }

  public async searchStore(name: string) {
    const products = await StoreModel.find({ businessName: { $regex: name, $options: 'i' } });

    if (products.length === 0) {
      throw new AppError(404, 'No store found for search term');
    }

    return products;
  }
}
