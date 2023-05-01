import { type NextFunction, type Request, type Response } from 'express';
import { OrderService } from './order.service';
import { type IOrder } from './order.interface';
import { Types } from 'mongoose';
import { AppError } from '../../utils';

export class OrderController {
  public orderService = new OrderService();

  public createOrder = async (req: Request<{}, {}, IOrder>, res: Response, next: NextFunction) => {
    try {
      const orderData = req.body;
      const userId = res.locals.user._id;

      const order = await this.orderService.createOrder({ ...orderData, owner: userId });

      return res.status(201).json({ success: true, data: order });
    } catch (err: any) {
      next(err);
    }
  };

  public getAllOrders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await this.orderService.getOrders();

      return res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error: any) {
      next(error);
    }
  };

  public singleOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const userId = res.locals.user._id;

      if (!Types.ObjectId.isValid(orderId)) {
        next(new AppError(400, 'Invalid orderID'));
        return;
      }

      const order = await this.orderService.getUserSingleOrder({ _id: orderId });

      if (String(order.owner._id) !== String(userId)) {
        next(new AppError(403, 'This is not your order'));
        return;
      }

      return res.status(200).json({ success: true, data: order });
    } catch (error: any) {
      next(error);
    }
  };

  public userOrders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user._id;

      const orders = await this.orderService.getAllOrdersOfUser({ owner: userId });

      return res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error: any) {
      next(error);
    }
  };

  public deleteUserOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const userId = res.locals.user._id;

      if (!Types.ObjectId.isValid(orderId)) {
        next(new AppError(400, 'Invalid orderID'));
        return;
      }

      const order = await this.orderService.getUserSingleOrder({ _id: orderId });

      if (String(order.owner._id) !== String(userId)) {
        next(new AppError(403, 'You cannot delete order'));
        return;
      }

      await this.orderService.deleteOrder(orderId);

      return res.sendStatus(204);
    } catch (error: any) {
      next(error);
    }
  };
}
