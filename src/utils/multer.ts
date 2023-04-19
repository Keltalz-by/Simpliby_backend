import { type Request } from 'express';
import multer from 'multer';
import { AppError } from './appError';

type FileNameCallback = (error: Error | null, filename: string) => void;
type FileFilterCallback = (error: any | null, file: boolean) => void;

const storage = multer.diskStorage({
  filename: (_req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
    callback(null, `${file.fieldname}${Date.now()}`);
  }
});

const fileFilter = (_req: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    callback(null, true);
  } else {
    callback(new AppError(400, 'Invalid image file. Image should be of type jpg, jpeg or png'), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
}).fields([
  { name: 'productImages', maxCount: 3 },
  { name: 'productRackImage', maxCount: 1 }
]);
