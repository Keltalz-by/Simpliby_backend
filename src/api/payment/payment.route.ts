/* eslint-disable @typescript-eslint/no-misused-promises */

import { Router } from 'express';
import { PaymentController } from './payment.controller';

export const paymentRoute = Router();
const path = '/payments';
const payment = new PaymentController();

paymentRoute.post(`${path}/webhook`, payment.confirmOrderPayment);
