// import { Types } from 'mongoose';
// import axios from 'axios';
// import { PAYSTACK_INITIALIZE_URL, PAYSTACK_SECRET_KEY } from '../../config';
// import { type IApiResponse, type ISubscribe } from './subscription.interface';
// import { AppError } from '../../utils';
// import StoreModel from '../store/store.model';
// import SubscriptionModel from './subscription.model';

// const url = PAYSTACK_INITIALIZE_URL as string;

// export class SubscriptionService {
//   public async subscribeToPlan(data: ISubscribe) {
//     try {
//       if (!Types.ObjectId.isValid(data.storeId)) {
//         throw new AppError(400, 'Invalid store ID.');
//       }

//       const store = await StoreModel.findOne({ _id: data.storeId });
//       if (store === null) {
//         throw new AppError(404, 'Store not found.');
//       }

//       const payload = {
//         email: store.email,
//         plan: data.plan === 'BASIC' ? 'PLN_c9paawnqno6unn6' : 'PLN_mcgk8hyeoywq2ro',
//         amount: data.plan === 'BASIC' ? '200000' : '500000'
//       };

//       const response = await axios.post<IApiResponse>(url, payload, {
//         headers: {
//           Authorization: `Bearer ${PAYSTACK_SECRET_KEY as string}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       await SubscriptionModel.create({ ...data, reference: response.data.data.reference });
//       await store.updateOne({ $set: { plan: data.plan } }, { new: true });

//       return { authorizationUrl: response.data.data.authorization_url };
//     } catch (error: any) {
//       throw new AppError(400, error.response.data.error);
//     }
//   }

//   public async findSubscription(data: object) {
//     return await SubscriptionModel.findOne(data);
//   }
// }
