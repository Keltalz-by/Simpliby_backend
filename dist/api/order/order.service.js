"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const mongoose_1 = require("mongoose");
const order_model_1 = __importDefault(require("./order.model"));
const utils_1 = require("../../utils");
// import ProductModel from '../product/product.model';
const product_model_1 = __importDefault(require("../product/product.model"));
const store_model_1 = __importDefault(require("../store/store.model"));
class OrderService {
    async createOrder(orderData, userId, storeId) {
        if (!mongoose_1.Types.ObjectId.isValid(orderData.productId)) {
            throw new utils_1.AppError(400, 'Invalid product ID');
        }
        if (!mongoose_1.Types.ObjectId.isValid(storeId)) {
            throw new utils_1.AppError(400, 'Invalid store ID');
        }
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            throw new utils_1.AppError(400, 'Invalid user ID');
        }
        const product = await product_model_1.default.findOne({ _id: orderData.productId });
        const order = await order_model_1.default.findOne({ owner: userId });
        if (product === null) {
            throw new utils_1.AppError(404, 'Product not found');
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
            throw new utils_1.AppError(400, 'You can only shop for products in this store');
        }
        const newOrder = await order_model_1.default.create({
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
    async getSingleOrder(orderId, userId) {
        if (!mongoose_1.Types.ObjectId.isValid(orderId)) {
            throw new utils_1.AppError(400, 'Invalid order ID');
        }
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            throw new utils_1.AppError(400, 'Invalid user ID');
        }
        const store = await store_model_1.default.findOne({ owner: userId });
        const order = await order_model_1.default.findOne({ _id: orderId }).populate('owner', 'name');
        if (store === null) {
            throw new utils_1.AppError(404, 'Store not found');
        }
        if (order === null) {
            throw new utils_1.AppError(404, 'Order not found');
        }
        if (order.storeId !== String(store._id)) {
            throw new utils_1.AppError(403, 'This order is not from your store');
        }
        return order;
    }
    async getAllOrdersOfStore(userId) {
        if (!mongoose_1.Types.ObjectId.isValid(userId)) {
            throw new utils_1.AppError(400, 'Invalid user ID');
        }
        const store = await store_model_1.default.findOne({ owner: userId });
        if (store === null) {
            throw new utils_1.AppError(404, 'Store not found');
        }
        const orders = await order_model_1.default.find({ storeId: store._id });
        return orders;
    }
    async updateOrderStatus(orderId, data) {
        if (!mongoose_1.Types.ObjectId.isValid(orderId)) {
            throw new utils_1.AppError(400, 'Invalid order ID');
        }
        const order = await order_model_1.default.findOne({ _id: orderId });
        if (order === null) {
            throw new utils_1.AppError(404, 'Order not found');
        }
        await order_model_1.default.updateOne({ _id: orderId }, { $set: { status: data } });
        return order;
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map