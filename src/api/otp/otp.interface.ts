import { type Document } from 'mongoose';

export default interface IOtp extends Document {
  _id?: object;
  owner: object;
  code: string;
  createdAt: Date;
  expiresAt: Date;
}
