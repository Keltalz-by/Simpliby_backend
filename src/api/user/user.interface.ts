import type * as mongoose from 'mongoose';

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  verified?: boolean;
  phone?: string;
  location?: string;
  role?: string;
  occupation?: string;
  followings?: string[];
}
