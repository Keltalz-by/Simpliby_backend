export interface ISubscribe {
  storeId: string;
  currency: 'NGN';
  amount: string;
  plan: string;
}

interface IData {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface IApiResponse {
  status: boolean;
  message: string;
  data: IData;
}
