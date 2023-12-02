import axios from 'axios';
import { type IPaymentData, type IPaymentResponse } from '../api/payment/payment.interface';
import { PAYSTACK_INITIALIZE_URL, PAYSTACK_SECRET_KEY } from '../config';
import { AppError } from './appError';

export const makePayment = async (data: IPaymentData) => {
  try {
    const url = PAYSTACK_INITIALIZE_URL as string;

    const response = await axios.post<IPaymentResponse>(url, data, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY as string}`,
        'Content-Type': 'application/json'
      }
    });
    return { authorizationUrl: response.data.data.authorization_url, reference: response.data.data.reference };
  } catch (error: any) {
    throw new AppError(400, error.response.data.error);
  }
};
