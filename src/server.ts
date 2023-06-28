import { set } from 'mongoose';
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
import { connectDB } from './utils';
import { SubscriptionRoute } from './api/subscription/subscription.route';
require('dotenv').config();

ValidateEnv();

const userRoute = new UserRoute();
const authRoute = new AuthRoute();
const storeRoute = new StoreRoute();
const categoryRoute = new CategoryRoute();
const productRoute = new ProductRoute();
const orderRoute = new OrderRoute();
const toBuyRoute = new ToBuyRoute();
const cartRoute = new CartRoute();
const subscriptionRoute = new SubscriptionRoute();

const app = new App([
  authRoute,
  storeRoute,
  subscriptionRoute,
  orderRoute,
  cartRoute,
  toBuyRoute,
  userRoute,
  categoryRoute,
  productRoute
]);

function connectToDatabase() {
  if (process.env.NODE_ENV !== 'production') {
    set('debug', true);
  }
  void connectDB();
}

connectToDatabase();

app.listen();
