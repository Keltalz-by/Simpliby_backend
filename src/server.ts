import { App } from './app';
import { UserRoute } from './api/user/user.route';
import { ValidateEnv } from './utils/validateEnv';
import { AuthRoute } from './api/auth/auth.route';
import { StoreRoute } from './api/store/store.route';
import { CategoryRoute } from './api/category/category.route';
import { ProductRoute } from './api/product/product.route';
import { OrderRoute } from './api/order/order.route';
import { ToBuyRoute } from './api/toBuy/toBuy.route';
import { CartRoute } from './api/cart/cart.route';

ValidateEnv();

const app = new App([
  new AuthRoute(),
  new StoreRoute(),
  new ProductRoute(),
  new OrderRoute(),
  new CartRoute(),
  new ToBuyRoute(),
  new UserRoute(),
  new CategoryRoute()
]);

app.listen();
