import type multer from 'multer';
import { AppError } from '../utils';
import { type Request, type Response, type NextFunction } from 'express';

export function multerErrorHandler(err: multer.MulterError, _req: Request, _res: Response, next: NextFunction) {
  if (err !== null) {
    if (err.message === 'Unexpected field') {
      next(new AppError(400, 'Maximum image limit exceeded or wrong image field.'));
      return;
    }
    next(new AppError(400, err.message));
    return;
  }

  next();
}
