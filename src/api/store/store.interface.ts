import type * as mongoose from 'mongoose';
import { type IGallery, type IGenericResponse } from '../../common';

export interface ICreateStore {
  businessName: string;
  businessLocation: string;
  description: string;
  address: string;
  city: string;
  country: string;
  storeImage?: IGallery;
  logo?: IGallery;
}

export interface IUpdateStore {
  userId: string;
  businessName: string;
  businessLocation: string;
  description: string;
  address: string;
  city: string;
  country: string;
  storeImage?: IGallery;
  logo?: IGallery;
}

export interface IStore {
  _id?: mongoose.Types.ObjectId;
  businessName: string;
  businessLocation: string;
  phone?: string;
  description?: string;
  address?: string;
  city?: string;
  country?: string;
  storeImage?: IGallery;
  logo?: IGallery;
  website?: string;
  followers?: string[];
  businessHours?: string;
  isStoreVerified?: boolean;
  balance?: number;
  amountWithdrawn?: number;
}

export interface IStoreResponse extends IGenericResponse {
  data: IStore;
}
