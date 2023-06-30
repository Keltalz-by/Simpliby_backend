// import { type NextFunction, type Request, type Response } from 'express';
// import { WalletService } from './wallet.service';

// export class WalletController {
//   public walletService = new WalletService();

//   public addToWallet = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { orderId } = req.params;
//       const wallet = await this.walletService.addToWallet(orderId);

//       res.status(200).json({ status: true, message: 'Wallet gotten successfully', data: wallet });
//     } catch (error: any) {
//       next(error);
//     }
//   };
// }
