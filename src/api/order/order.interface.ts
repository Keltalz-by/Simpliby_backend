import { type IOrderItem } from '../orderItem/orderItem.interface';
import { type IUser } from '../user/user.interface';

export interface IOrder {
  owner?: IUser['_id'];
  orderItems: [IOrderItem['_id']];
  phone?: string;
  deliveryAddress?: string;
  country?: string;
  totalPrice?: number;
}
