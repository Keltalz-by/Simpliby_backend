import { type Request, type Response, type NextFunction } from 'express';
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

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = res.locals.user._id;

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
