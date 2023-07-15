import { type NextFunction, type Request, type Response } from 'express';
import crypto from 'crypto';
import { PaymentService } from './payment.service';
import { OrderService } from '../order/order.service';
import { AppError } from '../../utils';
import { UserService } from '../user/user.service';
import { PAYSTACK_SECRET_KEY } from '../../config';

export class PaymentController {
  public paymentService = new PaymentService();
  public orderService = new OrderService();
  public userService = new UserService();

  public orderPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const userId: string = res.locals.user._id;

      const user = await this.userService.findUser({ _id: userId });

      if (user === null) {
        next(new AppError(404, 'User does not exist'));
        return;
      }

      const { authorizationUrl, charges } = await this.paymentService.makePayment(user.email, orderId);

      res.status(200).json({
        success: true,
        message: 'Payment initiated successfully',
        data: { authorizationUrl, charges }
      });
    } catch (error: any) {
      next(error);
    }
  };

  public confirmOrderPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const { orderId } = req.params;
      const secret = PAYSTACK_SECRET_KEY as string;
      const hash = crypto.createHmac('sha512', secret).update(JSON.stringify(req.body)).digest('hex');

      if (hash === req.headers['x-paystack-signature']) {
        const event = req.body;
        if (event.length !== 0 && event.event === 'charge.success') {
          console.log(event.data.id);
          return res.status(200).json({ status: 'success', message: 'Transfer successful' });
        }
      }
      res.send(200);
    } catch (error: any) {
      next(error);
    }
    // throw new AppError(400, 'You cannot make such request');
  };
}
