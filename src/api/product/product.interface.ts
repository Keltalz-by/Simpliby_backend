// import { type IGallery, type IGenericResponse } from "../../common";
import { type IGallery } from '../../common';
// import { type Store } from "../store/store.model";
// import { type Product } from "./product.model";

export interface IProduct {
  _id?: string;
  categoryId: string;
  storeId: string;
  productName: string;
  description: string;
  itemLocation?: string;
  currency?: string;
  price: string;
  reservationPrice: string;
  productImages?: IGallery[];
  productRackImage?: object;
  inStock?: string;
}

export type ProductResponse<T> = { err: object } | T;
