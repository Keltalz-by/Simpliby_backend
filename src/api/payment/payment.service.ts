import { Types } from 'mongoose';
import axios from 'axios';
import { type IPaymentData, type IPayment, type IPaymentResponse } from './payment.interface';
import PaymentModel from './payment.model';
import { AppError } from '../../utils';
import OrderModel from '../order/order.model';
import { PAYSTACK_INITIALIZE_URL, PAYSTACK_SECRET_KEY } from '../../config';
import UserModel from '../user/user.model';

const url = PAYSTACK_INITIALIZE_URL as string;

export class PaymentService {
  public async getPaymentReference(data: IPaymentData) {
    try {
      const response = await axios.post<IPaymentResponse>(url, data, {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY as string}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(response.data);
      return { authorizationUrl: response.data.data.authorization_url, reference: response.data.data.reference };
    } catch (error: any) {
      throw new AppError(400, error.response.data.error);
    }
  }

  public async initiatePayment(data: IPayment) {
    if (!Types.ObjectId.isValid(data.order)) {
      throw new AppError(400, 'Invalid order ID');
    }

    const user = await UserModel.findOne({ email: data.owner });

    if (user === null) {
      throw new AppError(404, `User with email ${data.owner} not found`);
    }

    const order = await OrderModel.findOne({ _id: data.order });

    if (order === null) {
      throw new AppError(404, 'Order not found');
    }

    const initiatePayment = await PaymentModel.create({ ...data, bill: order.totalPrice });

    return initiatePayment;
  }
}
