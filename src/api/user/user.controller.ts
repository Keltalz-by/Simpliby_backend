import { type Request, type Response, type NextFunction } from 'express';
import { Types } from 'mongoose';
import { UserService } from './user.service';
import { AppError } from '../../utils';
import _ from 'lodash';
import { type UpdateProfileInput } from './user.schema';

const profileDataNotNeeded = ['isEmailVerified', 'role', 'isSeller', '_id'];

export class UserController {
  public userService = new UserService();

  public getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.findAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (err: any) {
      next(err);
    }
  };

  public getUserProfile = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;

      const profile = _.omit(user.toJSON(), profileDataNotNeeded);

      res.status(200).json({ success: true, data: profile });
    } catch (error: any) {
      next(error);
    }
  };

  public updateUserProfile = async (req: Request<{}, {}, UpdateProfileInput>, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;
      const profileData = req.body;

      await this.userService.updateUser(user.id, profileData);

      res.status(200).json({ success: true, message: 'Profile updated successfully' });
    } catch (error: any) {
      next(error);
    }
  };

  public followStore = async (req: Request<{ storeId: string }, {}, {}>, res: Response, next: NextFunction) => {
    try {
      const { storeId } = req.params;
      const userId = res.locals.user._id;

      await this.userService.followStore(userId, storeId);
      res.status(200).json({ status: true, message: 'Store followed successfully' });
    } catch (error: any) {
      next(error);
    }
  };

  public unfollowStore = async (req: Request<{ storeId: string }, {}, {}>, res: Response, next: NextFunction) => {
    try {
      const { storeId } = req.params;
      const userId = res.locals.user._id;

      await this.userService.unfollowStore(userId, storeId);
      res.status(200).json({ status: true, message: 'Store unfollowed successfully' });
    } catch (error: any) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const id: string = res.locals.user.user;

      if (!Types.ObjectId.isValid(userId)) {
        next(new AppError(400, 'Invalid user ID'));
        return;
      }

      if (id !== userId) {
        next(new AppError(403, 'You are not authorized to delete user'));
        return;
      }

      await this.userService.deleteUser(userId);

      res.sendStatus(204);
    } catch (error: any) {
      next(error);
    }
  };
}
