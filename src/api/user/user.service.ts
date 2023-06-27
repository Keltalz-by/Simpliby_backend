import * as mongoose from 'mongoose';
import { AppError } from '../../utils';
import UserModel from '../user/user.model';
import StoreModel from '../store/store.model';

export class UserService {
  public async findUser(option: object) {
    return await UserModel.findOne(option).select('-password -createdAt -updatedAt -__v');
  }

  public async followStore(userId: string, storeId: string) {
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      throw new AppError(400, 'Invalid store ID.');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError(400, 'Invalid user ID.');
    }

    const user = await UserModel.findOne({ _id: userId });
    const store = await StoreModel.findOne({ _id: storeId });

    if (user === null) {
      throw new AppError(404, 'User not found');
    }
    if (store === null) {
      throw new AppError(404, 'Store not found.');
    }

    if (!store.followers.includes(userId)) {
      await store.updateOne({ $push: { followers: userId } });
      await user.updateOne({ $push: { followings: storeId } });
    }
    throw new AppError(400, 'You have already followed this store');
  }

  public async unfollowStore(userId: string, storeId: string) {
    if (!mongoose.Types.ObjectId.isValid(storeId)) {
      throw new AppError(400, 'Invalid store ID.');
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError(400, 'Invalid user ID.');
    }

    const user = await UserModel.findOne({ _id: userId });
    const store = await StoreModel.findOne({ _id: storeId });

    if (user === null) {
      throw new AppError(404, 'User not found');
    }
    if (store === null) {
      throw new AppError(404, 'Store not found.');
    }

    if (store.followers.includes(userId)) {
      await store.updateOne({ $pull: { followers: userId } });
      await user.updateOne({ $pull: { followings: storeId } });
    }
    throw new AppError(400, 'You do not follow store');
  }

  public async findAllUsers() {
    return await UserModel.find({}).orFail().exec();
  }

  public async deleteUser(userId: string) {
    const user = await UserModel.findOne({ _id: userId });

    if (user === null) {
      throw new AppError(404, 'User not found');
    }

    return await user.deleteOne();
  }

  public async updateUser(userId: string, options: object) {
    return await UserModel.updateOne(
      { _id: userId },
      {
        $set: options
      }
    );
  }
}
