import StoreModel, { type Store } from '../store/store.model';

export class StoreService {
  public async createStore(storeData: Partial<Store>) {
    return await (await StoreModel.create(storeData)).populate('owner', 'name');
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
}
