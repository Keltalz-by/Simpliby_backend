import { Types } from 'mongoose';
import OrderModel, { type Order } from './order.model';
import { type ICreateOrder } from './order.interface';
import { AppError } from '../../utils';
// import ProductModel from '../product/product.model';
import ProductModel from '../product/product.model';
import StoreModel from '../store/store.model';

export class OrderService {
  public async createOrder(orderData: ICreateOrder, userId: string, storeId: string): Promise<Order> {
    if (!Types.ObjectId.isValid(orderData.productId)) {
      throw new AppError(400, 'Invalid product ID');
    }

    if (!Types.ObjectId.isValid(storeId)) {
      throw new AppError(400, 'Invalid store ID');
    }

    if (!Types.ObjectId.isValid(userId)) {
      throw new AppError(400, 'Invalid user ID');
    }

    const product = await ProductModel.findOne({ _id: orderData.productId });
    const order = await OrderModel.findOne({ owner: userId });

    if (product === null) {
      throw new AppError(404, 'Product not found');
    }

    if (order !== null && order.status !== 'Paid') {
      const productIndex = order.items.findIndex((item) => item.productId === orderData.productId);

      if (productIndex > -1) {
        const orderItem = order.items[productIndex];
        orderItem.quantity += orderData.quantity;
        order.totalPrice = order.items.map((item) => item).reduce((a, b) => a + b.quantity * b.price, 0);
        order.items[productIndex] = orderItem;

        return await order.save();
      }
      order.items.push({
        productId: orderData.productId,
        quantity: orderData.quantity,
        price: parseInt(product.price)
      });
      order.totalPrice = order.items.map((item) => item).reduce((a, b) => a + b.quantity * b.price, 0);
      return await order.save();
    }

    if (String(product.storeId) !== storeId) {
      throw new AppError(400, 'You can only shop for products in this store');
    }

    const newOrder = await OrderModel.create({
      owner: userId,
      items: [
        {
          productId: orderData.productId,
          quantity: orderData.quantity,
          price: parseInt(product.price)
        }
      ],
      totalPrice: parseInt(product.price) * orderData.quantity,
      storeId: product.storeId
    });
    return newOrder;
  }

  public async getSingleOrder(orderId: string, userId: string): Promise<Order> {
    if (!Types.ObjectId.isValid(orderId)) {
      throw new AppError(400, 'Invalid order ID');
    }

    if (!Types.ObjectId.isValid(userId)) {
      throw new AppError(400, 'Invalid user ID');
    }

    const store = await StoreModel.findOne({ owner: userId });
    const order = await OrderModel.findOne({ _id: orderId }).populate('owner', 'name');

    if (store === null) {
      throw new AppError(404, 'Store not found');
    }

    if (order === null) {
      throw new AppError(404, 'Order not found');
    }

    if (order.storeId !== String(store._id)) {
      throw new AppError(403, 'This order is not from your store');
    }

    return order;
  }

  public async getAllOrdersOfStore(userId: string): Promise<Order[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new AppError(400, 'Invalid user ID');
    }

    const store = await StoreModel.findOne({ owner: userId });

    if (store === null) {
      throw new AppError(404, 'Store not found');
    }

    const orders = await OrderModel.find({ storeId: store._id });

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

  // public async deleteOrder(orderId: string) {
  //   //     const order = await OrderModel.findOne({ _id: orderId });
  //   //     if (order !== null) {
  //   //       order.orderItems.map(async (item) => {
  //   //         await OrderItemModel.findByIdAndRemove(item);
  //   //       });
  //   //       return await order?.deleteOne();
  //   //     }
  //   //     throw new AppError(404, 'Order not found');
  // }
}
