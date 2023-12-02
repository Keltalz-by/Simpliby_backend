/* eslint-disable @typescript-eslint/restrict-plus-operands */
import * as mongoose from 'mongoose';
import { AppError } from '../../utils';
import StoreModel from '../store/store.model';
import { type IUpdateStore, type ICreateStore } from './store.interface';
import UserModel from '../user/user.model';
// import UserModel from '../user/user.model';

export class StoreService {
  public async createStore(storeInput: ICreateStore, owner: string) {
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      throw new AppError(400, 'Invalid user ID.');
    }
    const user = await UserModel.findOne({ _id: owner });
    const store = await StoreModel.findOne({ businessName: storeInput.businessName });
    if (user === null) {
      throw new AppError(404, `User with ID ${owner} does not exist`);
    }
    if (user.isSeller) {
      throw new AppError(400, `User already have a store`);
    }
    if (store !== null) {
      throw new AppError(409, `Store with business name ${storeInput.businessName} already exist`);
    }

    await UserModel.findByIdAndUpdate(
      { _id: owner },
      {
        $set: { role: 'seller' }
      },
      { new: true }
    );

    const newStore = await (await StoreModel.create(storeInput)).populate('owner', 'name');
    await user.updateOne({ $set: { isSeller: true, role: 'seller' } });
    return newStore;
  }

  public async updateStore(storeData: IUpdateStore) {
    return await StoreModel.updateOne({ owner: storeData.userId }, { $set: storeData });
  }

  public async findStore(option: object) {
    const store = await StoreModel.findOne(option);

    if (store === null) {
      throw new AppError(404, 'Store not found.');
    }

    return store;
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
    return await StoreModel.find().populate({ path: 'owner', select: 'name -_id' }).exec();
  }

  public async searchStore(name: string) {
    const products = await StoreModel.find({ businessName: { $regex: name, $options: 'i' } });

    if (products.length === 0) {
      throw new AppError(404, 'No store found for search term');
    }

    return products;
  }
}
