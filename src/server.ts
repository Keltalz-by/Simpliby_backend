import { App } from './app';
import { userRoute } from './api/user/user.route';
import { ValidateEnv } from './utils/validateEnv';
import { authRoute } from './api/auth/auth.route';
import { storeRoute } from './api/store/store.route';
import { categoryRoute } from './api/category/category.route';
import { productRoute } from './api/product/product.route';
import { orderRoute } from './api/order/order.route';
import { cartRoute } from './api/cart/cart.route';
import { paymentRoute } from './api/payment/payment.route';

ValidateEnv();

const app = new App([
  authRoute,
  storeRoute,
  userRoute,
  paymentRoute,
  cartRoute,
  categoryRoute,
  productRoute,
  orderRoute
]);

app.listen();
