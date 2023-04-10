import { type Request, type Response, type NextFunction } from 'express';
import { UserService } from './user.service';

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

  public getAllBuyers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.findAllBuyers();
      return res.status(200).json({ success: true, data: users });
    } catch (err: any) {
      next(err);
    }
  };
}
