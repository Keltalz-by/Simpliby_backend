import { type IGallery, type IGenericResponse } from '../../common';
import { type IUser } from '../user/user.interface';

export interface IStore {
  _id?: string;
  owner: IUser['_id'];
  businessName: string;
  location: string;
  description: string;
  address: string;
  city: string;
  country: string;
  storeImages?: IGallery[];
  logo?: IGallery;
}

export interface IStoreResponse extends IGenericResponse {
  data: IStore;
}
