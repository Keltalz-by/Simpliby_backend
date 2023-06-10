// import { AppError } from '../utils';
import { type Request, type Response, type NextFunction } from 'express';

export const requireUser = (_req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;

    if (user === null) {
      next();
      return;
    }

    next();
  } catch (error: any) {
    next(error);
  }
};
