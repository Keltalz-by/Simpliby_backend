import { type Request, type Response, type NextFunction } from 'express';
import { get } from 'lodash';
import { AppError, redisClient, verifyJwt } from '../utils';
import { ACCESS_TOKEN_PUBLIC_KEY } from '../config';
import { UserService } from '../api/user/user.service';

const userService = new UserService();

export const deserializeUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const accessToken =
      get(req, 'cookies.accessToken') ?? get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

    if (accessToken === null) {
      next(new AppError(401, 'You are not logged in'));
      return;
    }

    const decoded = verifyJwt<{ sub: string }>(accessToken as string, ACCESS_TOKEN_PUBLIC_KEY as string);

    if (decoded === null) {
      next(new AppError(401, 'Invalid token'));
      return;
    }

    const session = await redisClient.get(JSON.stringify(decoded.sub));

    if (session === null) {
      next(new AppError(401, 'Your session has expired'));
    }

    const user = await userService.findUser({ _id: decoded.sub });

    if (user === null) {
      next(new AppError(401, 'User with token no longer exist'));
      return;
    }

    res.locals.user = user;
    next();
  } catch (err: any) {
    next(err);
  }
};
