// // import { Types } from 'mongoose';

// import { AppError } from '../../utils';
// import { OrderService } from '../order/order.service';
// import WalletModel from './wallet.model';

// // interface IWalletData {
// //   storeId: string;
// //   balance?: number;
// //   amountWithdrawn?: number;
// // }

// const orderService = new OrderService();

// export class WalletService {
//   public async addToWallet(orderId: string) {
//     const orderDetails = await orderService.getProductIds(orderId);
//     if (orderDetails.length === 0) {
//       throw new AppError(400, 'Order details is empty');
//     }
//     const wallet = Promise.all(
//       orderDetails.map(async (info) => {
//         const findWallet = await WalletModel.findOne({ storeId: info.storeId });
//         if (findWallet !== null) {
//           findWallet.balance += parseInt(info.productPrice);
//           await findWallet.save();
//           return findWallet;
//         }
//         return await WalletModel.create({ storeId: info.storeId, balance: info.productPrice });
//       })
//     );
//     return await wallet;
//   }
// }
