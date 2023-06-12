/* The OrderRoute class defines the routes for handling orders in an Express application, including
creating, retrieving, and deleting orders. */

export interface IOrder {
  owner: string;
  cart: string;
  phone?: string;
  status?: string;
  paymentMethod: string;
  deliveryAddress?: string;
  state?: string;
  country?: string;
  totalPrice?: number;
}
