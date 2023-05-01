import { type IProduct } from '../product/product.interface';

export interface IOrderItem {
  _id?: string;
  product: IProduct;
  quantity: number;
}
