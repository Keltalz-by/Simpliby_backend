import OrderModel, { type Order } from './order.model';
import { type IOrder } from './order.interface';
import { AppError } from '../../utils';
// import ProductModel from '../product/product.model';
import { Types } from 'mongoose';
import CartModel from '../cart/cart.model';

export class OrderService {
  public async createOrder(orderData: IOrder): Promise<Order> {
    if (!Types.ObjectId.isValid(orderData.cart)) {
      throw new AppError(400, 'Invalid cart ID');
    }

    if (!Types.ObjectId.isValid(orderData.owner)) {
      throw new AppError(400, 'Invalid user ID');
    }
    const cart = await CartModel.findOne({ _id: orderData.cart });

    if (cart === null) {
      throw new AppError(404, 'Cart not found');
    }

    const order = await OrderModel.create({ ...orderData, totalPrice: cart.totalPrice });

    return order;
    //   const orderItemIds = Promise.all(
    //     orderData.orderItems.map(async (item) => {
    //       const newOrderItem = await OrderItemModel.create(item);
    //       return newOrderItem._id;
    //     })
    //   );
    //   const allOrderItemIds = await orderItemIds;
    //   const totalPrices = await Promise.all(
    //     allOrderItemIds.map(async (itemId) => {
    //       const orderItem = await OrderItemModel.findOne({ _id: itemId }).populate('product', 'price');
    //       if (orderItem !== null) {
    //         const orderProduct = await ProductModel.findOne({ _id: orderItem?.product });
    //         if (orderProduct !== null) {
    //           const totalPrice = parseInt(orderProduct?.price) * orderItem.quantity;
    //           return totalPrice;
    //         }
    //         throw new AppError(404, 'Product not found');
    //       }
    //       throw new AppError(404, 'Order item does not exist');
    //     })
    //   );
    //   const totalPrice = totalPrices.reduce((x, y) => x + y, 0);
    //   return await (
    //     await OrderModel.create({ ...orderData, orderItems: allOrderItemIds, totalPrice })
    //   ).populate('owner', 'name');
  }

  public async getOrders(): Promise<Order[]> {
    const orders = await OrderModel.find().populate('owner', 'name').sort('-createdAt');
    return orders;
  }

  public async getUserSingleOrder(option: object): Promise<Order> {
    const order = await OrderModel.findOne(option).populate('owner', 'name').populate({
      path: 'cart'
    });

    if (order === null) {
      throw new AppError(404, 'Order not found');
    }
    return order;
  }

  public async getAllOrdersOfUser(option: object): Promise<Order[]> {
    const orders = await OrderModel.find(option);

    return orders;
  }

  public async updateOrderStatus(orderId: string, data: string) {
    if (!Types.ObjectId.isValid(orderId)) {
      throw new AppError(400, 'Invalid order ID');
    }

    const order = await OrderModel.findOne({ _id: orderId });

    if (order === null) {
      throw new AppError(404, 'Order not found');
    }

    await OrderModel.updateOne({ _id: orderId }, { $set: { status: data } });

    return order;
  }

  public async deleteOrder(orderId: string) {
    //     const order = await OrderModel.findOne({ _id: orderId });
    //     if (order !== null) {
    //       order.orderItems.map(async (item) => {
    //         await OrderItemModel.findByIdAndRemove(item);
    //       });
    //       return await order?.deleteOne();
    //     }
    //     throw new AppError(404, 'Order not found');
  }
}
