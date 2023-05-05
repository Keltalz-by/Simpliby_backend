import { type CartDataInterface } from './cart.interface';
import CartModel from './cart.model';
import ProductModel from '../product/product.model';
import { AppError } from '../../utils';
import { Types } from 'mongoose';

export class CartService {
  public async addToCart(cartData: CartDataInterface, userId: string) {
    const cart = await CartModel.findOne({ owner: userId });

    if (!Types.ObjectId.isValid(cartData.productId)) {
      throw new AppError(400, 'Invalid product ID');
    }

    const product = await ProductModel.findOne({ _id: cartData.productId });

    if (product === null) {
      throw new AppError(404, 'Product not found');
    }

    if (cart !== null) {
      const productIndex = cart.items.findIndex((item) => item.product === cartData.productId);

      if (productIndex > -1) {
        const myProduct = cart.items[productIndex];
        myProduct.quantity += cartData.quantity;
        cart.totalPrice = cart.items.map((item) => item).reduce((a, b) => a + b.quantity * b.price, 0);
        cart.items[productIndex] = myProduct;
        return await cart.save();
      }
      cart.items.push({
        product: cartData.productId,
        quantity: cartData.quantity,
        price: parseInt(product.price)
      });
      cart.totalPrice = cart.items.map((item) => item).reduce((a, b) => a + b.quantity * b.price, 0);
      return await cart.save();
    }

    const newCart = await CartModel.create({
      owner: userId,
      items: [
        {
          product: cartData.productId,
          quantity: cartData.quantity,
          price: parseInt(product.price)
        }
      ],
      totalPrice: parseInt(product.price) * cartData.quantity
    });
    return newCart;
  }

  public async getUserCart(userId: string) {
    const cart = await CartModel.findOne({ owner: userId })
      .populate('owner', 'name')
      .populate({
        path: 'items',
        populate: {
          path: 'product',
          select: 'productName'
        }
      });

    if (cart === null) {
      throw new AppError(404, 'Cart not found');
    }

    return cart;
  }

  public async deleteUserCart(userId: string) {
    const cart = await CartModel.findOne({ owner: userId });

    if (cart === null) {
      throw new AppError(404, 'Cart not found');
    }

    return await cart.deleteOne();
  }
}
