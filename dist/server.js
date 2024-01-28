"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const user_route_1 = require("./api/user/user.route");
const validateEnv_1 = require("./utils/validateEnv");
const auth_route_1 = require("./api/auth/auth.route");
const store_route_1 = require("./api/store/store.route");
const category_route_1 = require("./api/category/category.route");
const product_route_1 = require("./api/product/product.route");
const order_route_1 = require("./api/order/order.route");
const cart_route_1 = require("./api/cart/cart.route");
const payment_route_1 = require("./api/payment/payment.route");
(0, validateEnv_1.ValidateEnv)();
const app = new app_1.App([
    auth_route_1.authRoute,
    store_route_1.storeRoute,
    user_route_1.userRoute,
    payment_route_1.paymentRoute,
    cart_route_1.cartRoute,
    category_route_1.categoryRoute,
    product_route_1.productRoute,
    order_route_1.orderRoute
]);
app.listen();
//# sourceMappingURL=server.js.map