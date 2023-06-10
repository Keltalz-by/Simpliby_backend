import { AppError } from '../../utils';
import StoreModel, { type Store } from '../store/store.model';
import UserModel from '../user/user.model';
import { type IStore } from './store.interface';

export class StoreService {
  public async createStore(storeData: IStore): Promise<Store> {
    const store = await (await StoreModel.create(storeData)).populate('owner', 'name');

    const user = await UserModel.findOne({ _id: store.owner._id });

    if (user?.role !== 'seller') {
      await user?.updateOne({ $set: { role: 'seller' } });
    }

    return store;
  }

  public async updateStore(storeId: string, options: object) {
    return await StoreModel.updateOne({ _id: storeId }, { $set: options });
  }

  public async findStore(option: object) {
    return await StoreModel.findOne(option);
  }

  public async findStoreById(id: string) {
    return await StoreModel.findById(id).orFail().exec();
  }

  public async findAllStores() {
    return await StoreModel.find({}).orFail().exec();
  }

  public async verifyStore(storeId: string) {
    return await StoreModel.updateOne(
      { _id: storeId },
      {
        $set: { verified: true }
      }
    );
  }

  public async searchStore(name: string) {
    const products = await StoreModel.find({ businessName: { $regex: name, $options: 'i' } });

    if (products.length === 0) {
      throw new AppError(404, 'No store found for search term');
    }

    return products;
  }
}
