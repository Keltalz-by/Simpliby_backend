"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const cart_service_1 = require("./cart.service");
class CartController {
    constructor() {
        this.cartService = new cart_service_1.CartService();
        this.AddProductToCart = async (req, res, next) => {
            try {
                const userId = res.locals.user._id;
                const cartData = req.body;
                const cart = await this.cartService.addToCart(cartData, userId);
                return res.status(200).json({ success: true, data: cart });
            }
            catch (err) {
                next(err);
            }
        };
        this.getUserCart = async (req, res, next) => {
            try {
                const userId = res.locals.user._id;
                const cart = await this.cartService.getUserCart(userId);
                return res.status(200).json({ success: true, data: cart });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteProductfromCart = async (req, res, next) => {
            try {
                const userId = res.locals.user._id;
                const { productId } = req.params;
                const cart = await this.cartService.deleteProductFromCart(userId, productId);
                return res.status(200).json({ success: true, data: cart });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteUserCart = async (req, res, next) => {
            try {
                const userId = res.locals.user._id;
                await this.cartService.deleteUserCart(userId);
                return res.sendStatus(204);
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map