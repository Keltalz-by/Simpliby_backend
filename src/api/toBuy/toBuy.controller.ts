import { type NextFunction, type Request, type Response } from 'express';
import { ToBuyService } from './toBuy.service';
import { type ToBuyInput } from './toBuy.schema';

export class ToBuyController {
  public toBuyService = new ToBuyService();

  public createToBuy = async (req: Request<{}, {}, ToBuyInput>, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const userId = res.locals.user._id;

      const toBuy = await this.toBuyService.createToBuy({ ...data, userId });

      return res.status(201).json({ success: true, data: toBuy });
    } catch (err: any) {
      next(err);
    }
  };

  public completeToBuy = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const userId = res.locals.user._id;
      const toBuy = await this.toBuyService.completeToBuy(id, userId);

      return res.status(200).json({ success: true, data: toBuy });
    } catch (error: any) {
      next(error);
    }
  };
}
