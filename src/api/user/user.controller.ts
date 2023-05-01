import { type Request, type Response, type NextFunction } from 'express';
import { Types } from 'mongoose';
import { UserService } from './user.service';
import { AppError } from '../../utils';

export class UserController {
  public userService = new UserService();

  public getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.findAllUsers();
      return res.status(200).json({ success: true, data: users });
    } catch (err: any) {
      next(err);
    }
  };

  public getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user._id;
      const user = await this.userService.findUser({ _id: userId });

      return res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.params;
      const id = res.locals.user._id;

      if (!Types.ObjectId.isValid(userId)) {
        next(new AppError(400, 'Invalid user ID'));
        return;
      }

      if (id !== userId) {
        next(new AppError(403, 'You are not authorized to delete user'));
        return;
      }

      await this.userService.deleteUser(userId);

      return res.sendStatus(204);
    } catch (error: any) {
      next(error);
    }
  };
}
