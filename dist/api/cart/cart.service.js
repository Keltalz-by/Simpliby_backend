"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const cart_model_1 = __importDefault(require("./cart.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const utils_1 = require("../../utils");
const mongoose_1 = require("mongoose");
class CartService {
    async addToCart(cartData, userId) {
        const cart = await cart_model_1.default.findOne({ owner: userId });
        if (!mongoose_1.Types.ObjectId.isValid(cartData.productId)) {
            throw new utils_1.AppError(400, 'Invalid product ID');
        }
        const product = await product_model_1.default.findOne({ _id: cartData.productId });
        if (product === null) {
            throw new utils_1.AppError(404, 'Product not found');
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
        const newCart = await cart_model_1.default.create({
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
    async getUserCart(userId) {
        const cart = await cart_model_1.default.findOne({ owner: userId })
            .populate('owner', 'name')
            .populate({
            path: 'items',
            populate: {
                path: 'product',
                select: 'productName'
            }
        });
        if (cart === null) {
            throw new utils_1.AppError(404, 'Cart not found');
        }
        return cart;
    }
    async deleteProductFromCart(userId, productId) {
        const cart = await cart_model_1.default.findOne({ owner: userId });
        if (!mongoose_1.Types.ObjectId.isValid(productId)) {
            throw new utils_1.AppError(400, 'Invalid product ID');
        }
        const product = await product_model_1.default.findOne({ _id: productId });
        if (product === null) {
            throw new utils_1.AppError(404, 'Product not found');
        }
        if (cart === null) {
            throw new utils_1.AppError(404, 'Cart not found');
        }
        const productIndex = cart.items.findIndex((item) => item.product === productId);
        if (productIndex > -1) {
            const myProduct = cart.items[productIndex];
            cart.totalPrice -= myProduct.price * myProduct.quantity;
            cart.items.splice(productIndex, 1);
            if (cart.items.length < 1) {
                await cart.deleteOne();
                return;
            }
            return await cart.save();
        }
        return cart;
    }
    async deleteUserCart(userId) {
        const cart = await cart_model_1.default.findOne({ owner: userId });
        if (cart === null) {
            throw new utils_1.AppError(404, 'Cart not found');
        }
        return await cart.deleteOne();
    }
}
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map