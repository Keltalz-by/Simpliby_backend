"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
class OrderController {
    constructor() {
        this.orderService = new order_service_1.OrderService();
        this.createOrder = async (req, res, next) => {
            try {
                const { storeId } = req.params;
                const orderData = req.body;
                const userId = res.locals.user._id;
                const order = await this.orderService.createOrder(orderData, userId, storeId);
                res.status(201).json({ success: true, data: order });
            }
            catch (err) {
                next(err);
            }
        };
        this.storeOrders = async (_req, res, next) => {
            try {
                const userId = res.locals.user._id;
                const orders = await this.orderService.getAllOrdersOfStore(userId);
                res.status(200).json({ success: true, count: orders.length, data: orders });
            }
            catch (error) {
                next(error);
            }
        };
        this.singleStoreOrder = async (req, res, next) => {
            try {
                const userId = res.locals.user._id;
                const { orderId } = req.params;
                const order = await this.orderService.getSingleOrder(orderId, userId);
                res.status(200).json({ success: true, data: order });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateOrderStatus = async (req, res, next) => {
            try {
                const { orderId } = req.params;
                const { status } = req.body;
                const order = await this.orderService.updateOrderStatus(orderId, status);
                res.status(200).json({ status: true, message: 'Order status updated successfully', data: order });
            }
            catch (error) {
                next(error);
            }
        };
        // public deleteUserOrder = async (req: Request, res: Response, next: NextFunction) => {
        //   try {
        //     const { orderId } = req.params;
        //     const userId = res.locals.user._id;
        //     const order = await this.orderService.getSingleOrder(orderId, userId);
        //     if (String(order.owner._id) !== String(userId)) {
        //       next(new AppError(403, 'You cannot delete order'));
        //       return;
        //     }
        //     await this.orderService.deleteOrder(orderId);
        //     return res.sendStatus(204);
        //   } catch (error: any) {
        //     next(error);
        //   }
        // };
    }
}
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map