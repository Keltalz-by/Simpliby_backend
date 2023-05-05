// import { type ObjectId } from 'mongoose';
import { type IProduct } from '../product/product.interface';
import { type IUser } from '../user/user.interface';

interface CartItem {
  productId: IProduct['_id'];
  quantity: number;
}

export interface CartInterface {
  owner?: IUser['_id'];
  cartItems: CartItem[];
  totalPrice?: number;
}

export interface CartDataInterface {
  productId: string;
  quantity: number;
}
