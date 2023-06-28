import { type NextFunction, type Request, type Response } from 'express';
import { AppError } from '../../utils';
import { SubscriptionService } from './subscription.service';

export class SubscriptionController {
  public subscriptionService = new SubscriptionService();

  public subscribeToPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const storeId = res.locals.store._id;
      const data = req.body;

      const subscription = await this.subscriptionService.findSubscription({ storeId });

      if (subscription !== null) {
        next(new AppError(400, `You are already subscribed to a ${subscription.plan} plan.`));
        return;
      }

      const { authorizationUrl } = await this.subscriptionService.subscribeToPlan({ ...data, storeId });

      res.status(200).json({ success: true, data: authorizationUrl });
    } catch (error: any) {
      next(error);
    }
  };

  public callbackUrl = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(400).json({ status: true, message: 'Payment successfull' });
    } catch (error: any) {
      next(error);
    }
  };
}
