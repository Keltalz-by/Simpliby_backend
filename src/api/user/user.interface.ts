import { type Document } from 'mongoose';

export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  photo: string;
  occupation: string;
  location: string;
}
