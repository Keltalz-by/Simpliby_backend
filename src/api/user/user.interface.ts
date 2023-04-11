import { type Document } from 'mongoose';

export default interface IUser extends Document {
  _id?: object;
  name?: string;
  email: string;
  password: string;
}
