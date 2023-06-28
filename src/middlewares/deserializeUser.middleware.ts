import { type Request, type Response, type NextFunction } from 'express';
import { AppError, verifyJwt } from '../utils';
import { ACCESS_TOKEN_PUBLIC_KEY } from '../config';
// import { AuthService } from '../api/auth/auth.service';
import { UserService } from '../api/user/user.service';
import { StoreService } from '../api/store/store.service';

// const authService = new AuthService();
const userService = new UserService();
const storeService = new StoreService();

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken: string = req.cookies.accessToken;
    if (accessToken === undefined) {
      next(new AppError(401, 'You are not logged in'));
      return;
    }
    const decoded = verifyJwt<{ userId: string }>(accessToken, ACCESS_TOKEN_PUBLIC_KEY as string);
    if (decoded !== null) {
      const user = await userService.findUser({ _id: JSON.parse(decoded.userId) });
      if (user !== null) {
        res.locals.user = user;
        next();
      } else {
        next(new AppError(401, 'User session has expired'));
        return;
      }
    } else {
      next(new AppError(401, 'Invalid access token'));
    }
  } catch (err: any) {
    next(err);
  }
};

export const isStore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken: string = req.cookies.accessToken;
    if (accessToken === undefined) {
      next(new AppError(401, 'You are not logged in'));
      return;
    }
    const decoded = verifyJwt<{ id: string }>(accessToken, ACCESS_TOKEN_PUBLIC_KEY as string);
    if (decoded !== null) {
      const store = await storeService.findStore({ _id: JSON.parse(decoded.id) });
      if (store !== null) {
        res.locals.store = store;
        next();
      } else {
        next(new AppError(401, 'Your session has expired'));
        return;
      }
    } else {
      next(new AppError(401, 'Invalid access token'));
    }
  } catch (err: any) {
    next(err);
  }
};
