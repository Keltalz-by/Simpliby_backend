// import { type NextFunction, type Request, type Response } from 'express';
// import { type OrderPaymentRequestInput } from '../order/order.schema';
// import { PaymentService } from './payment.service';
// import { OrderService } from '../order/order.service';
// import { AppError } from '../../utils';
// import { UserService } from '../user/user.service';

// export class PaymentController {
//   public paymentService = new PaymentService();
//   public orderService = new OrderService();
//   public userService = new UserService();

//   public initiatePayment = async (
//     req: Request<OrderPaymentRequestInput['params']>,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {
//       const { orderId } = req.params;
//       const data = req.body;
//       const userId: string = res.locals.user._id;
//       const order = await this.orderService.getUserSingleOrder({ _id: orderId });

//       const user = await this.userService.findUser({ _id: userId });

//       if (user === null) {
//         next(new AppError(404, 'User does not exist'));
//         return;
//       }

//       if (data.email !== user.email) {
//         next(new AppError(403, 'You are not allowed to make to make the payment'));
//         return;
//       }

//       if (order.paymentMethod !== 'Pay With Card') {
//         next(new AppError(400, 'This option is not applicable to you'));
//         return;
//       }

//       const { authorizationUrl, reference } = await this.paymentService.getPaymentReference({
//         email: user.email,
//         amount: (order.totalPrice * 100).toString()
//       });

//       await this.paymentService.initiatePayment({
//         ...data,
//         owner: user.email,
//         order: orderId,
//         reference
//       });

//       res.status(200).json({
//         success: true,
//         message: 'Payment initiated successfully',
//         data: authorizationUrl
//       });
//     } catch (error: any) {
//       next(error);
//     }
//   };
// }
