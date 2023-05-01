import { Types } from 'mongoose';
import ToBuyModel, { type ToBuy } from './toBuy.model';
import { AppError } from '../../utils';

export class ToBuyService {
  public async createToBuy(data: ToBuy) {
    return await ToBuyModel.create(data);
  }

  public async completeToBuy(id: string, userId: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new AppError(400, 'Invalid ID');
    }

    const toBuy = await ToBuyModel.findOne({ _id: id });

    if (toBuy === null) {
      throw new AppError(404, 'ToBuy not found');
    }

    if (String(toBuy._id) !== String(userId)) {
      throw new AppError(403, 'Not your tobuy');
    }

    toBuy.isCompleted = true;
    await toBuy.save();
    return toBuy;
  }
}
