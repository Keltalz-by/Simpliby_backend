import { App } from './app';
import { userRoute } from './api/user/user.route';
import { ValidateEnv } from './utils/validateEnv';
import { authRoute } from './api/auth/auth.route';
import { storeRoute } from './api/store/store.route';
// import { CategoryRoute } from './api/category/category.route';
// import { ProductRoute } from './api/product/product.route';
// import { OrderRoute } from './api/order/order.route';
// import { ToBuyRoute } from './api/toBuy/toBuy.route';
// import { CartRoute } from './api/cart/cart.route';
import { paymentRoute } from './api/payment/payment.route';

ValidateEnv();

const app = new App([
  authRoute,
  storeRoute,
  userRoute,
  paymentRoute
  // new OrderRoute(),
  // new ProductRoute(),
  // new CartRoute(),
  // new ToBuyRoute(),
  // new CategoryRoute()
]);

// const app = new App([
//   new AuthRoute(),
//   new OrderRoute(),
//   new StoreRoute(),
// new ProductRoute(),
// new CartRoute(),
// new ToBuyRoute(),
// new UserRoute(),
// new CategoryRoute()
// ]);

app.listen();
