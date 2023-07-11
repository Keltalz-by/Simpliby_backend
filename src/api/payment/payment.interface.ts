// import { type IUser } from '../user/user.interface';

export interface IPayment {
  _id?: string;
  owner: string;
  order: string;
  bill: number;
  status?: string;
  reference: string;
}

export interface IPaymentData {
  email: string;
  amount: string;
  reference: string;
  // subaccount: string;
  // bearer: string;
}

interface IData {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface IPaymentResponse {
  status: boolean;
  message: string;
  data: IData;
}
