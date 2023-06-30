/* eslint-disable @typescript-eslint/naming-convention */
import { type NextFunction, type Request, type Response } from 'express';
import { OrderService } from './order.service';
import { AppError } from '../../utils';
import { type OrderInput } from './order.schema';

export class OrderController {
  public orderService = new OrderService();

  public createOrder = async (
    req: Request<OrderInput['params'], {}, OrderInput['body']>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { storeId } = req.params;
      const orderData = req.body;
      const userId: string = res.locals.user._id;

      const order = await this.orderService.createOrder(orderData, userId, storeId);

      res.status(201).json({ success: true, data: order });
    } catch (err: any) {
      next(err);
    }
  };

  public storeOrders = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user._id;

      const orders = await this.orderService.getAllOrdersOfStore(userId);

      res.status(200).json({ success: true, count: orders.length, data: orders });
    } catch (error: any) {
      next(error);
    }
  };

  public singleStoreOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = res.locals.user._id;
      const { orderId } = req.params;

      const order = await this.orderService.getSingleOrder(orderId, userId);

      res.status(200).json({ success: true, data: order });
    } catch (error: any) {
      next(error);
    }
  };

  public updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      const order = await this.orderService.updateOrderStatus(orderId, status);

      res.status(200).json({ status: true, message: 'Order status updated successfully', data: order });
    } catch (error: any) {
      next(error);
    }
  };

  public deleteUserOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { orderId } = req.params;
      const userId = res.locals.user._id;

      const order = await this.orderService.getSingleOrder(orderId, userId);

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
