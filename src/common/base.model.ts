import { type Document } from 'mongoose';

export interface BaseModel extends Document {
  name: string;
  email: string;
  password: string;
  followers: string[];
  followings: string[];
  role: string;
  phone: string;
}
