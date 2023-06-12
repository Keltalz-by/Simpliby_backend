// import { type ObjectId } from 'mongoose';
import { type IProduct } from '../product/product.interface';
import { type IUser } from '../user/user.interface';

interface CartItem {
  productId: IProduct['_id'];
  quantity: number;
}

export interface ICart {
  _id?: string;
  owner?: IUser['_id'];
  items: CartItem[];
  totalPrice: number;
}

export interface CartDataInterface {
  productId: string;
  quantity: number;
}
