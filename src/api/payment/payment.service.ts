import { Types } from 'mongoose';
import { customAlphabet } from 'nanoid';
import PaymentModel from './payment.model';
import { AppError, makePayment } from '../../utils';
import OrderModel from '../order/order.model';
import UserModel from '../user/user.model';

export class PaymentService {
  public async makePayment(email: string, orderId: string) {
    const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
    if (!Types.ObjectId.isValid(orderId)) {
      throw new AppError(400, 'Invalid order ID');
    }

    const order = await OrderModel.findOne({ _id: orderId });

    if (order === null) {
      throw new AppError(404, 'Order not found');
    }

    const user = await UserModel.findOne({ _id: order.owner });

    if (user === null) {
      throw new AppError(404, 'User not found');
    }

    if (user.email !== email) {
      throw new AppError(403, 'You can only pay for your order');
    }

    if (order.totalPrice < 2500) {
      const fee: number = 0.015 * order.totalPrice;
      const result = await makePayment({
        email,
        amount: String((order.totalPrice + fee) * 100),
        reference: `Pay-${nanoid()}`
      });

      await PaymentModel.create({
        owner: order.owner,
        order: order._id,
        bill: order.totalPrice + fee,
        reference: result.reference
      });
      return {
        authorizationUrl: result.authorizationUrl,
        reference: result.reference,
        charges: fee
      };
    }
    const fee: number = 0.015 * order.totalPrice + 100;
    const feeCap: number = 2000;

    if (fee > feeCap) {
      const result = await makePayment({
        email,
        amount: String((order.totalPrice + feeCap) * 100),
        reference: `Pay-${nanoid()}`
      });

      await PaymentModel.create({
        owner: order.owner,
        order: order._id,
        bill: order.totalPrice + feeCap,
        reference: result.reference
      });
      return {
        authorizationUrl: result.authorizationUrl,
        reference: result.reference,
        charges: feeCap
      };
    }
    const result = await makePayment({
      email,
      amount: String((order.totalPrice + fee) * 100),
      reference: `Pay-${nanoid()}`
    });

    await PaymentModel.create({
      owner: order.owner,
      order: order._id,
      bill: order.totalPrice + fee,
      reference: result.reference
    });
    return { authorizationUrl: result.authorizationUrl, reference: result.reference, charges: fee };
  }

  public async confirmPayment(orderId: string) {
    if (!Types.ObjectId.isValid(orderId)) {
      throw new AppError(400, 'Invalid order ID');
    }

    const order = await OrderModel.findOne({ _id: orderId });

    if (order === null) {
      throw new AppError(404, 'Order not found');
    }
  }
}
