import { App } from './app';
import { UserRoute } from './api/user/user.route';
import { ValidateEnv } from './utils/validateEnv';
import { AuthRoute } from './api/auth/auth.route';
import { StoreRoute } from './api/store/store.route';
import { CategoryRoute } from './api/category/category.route';
import { ProductRoute } from './api/product/product.route';
import { OrderRoute } from './api/order/order.route';
import { ToBuyRoute } from './api/toBuy/toBuy.route';
require('dotenv').config();

ValidateEnv();

const userRoute = new UserRoute();
const authRoute = new AuthRoute();
const storeRoute = new StoreRoute();
const categoryRoute = new CategoryRoute();
const productRoute = new ProductRoute();
const orderRoute = new OrderRoute();
const toBuyRoute = new ToBuyRoute();

const app = new App([authRoute, toBuyRoute, orderRoute, storeRoute, userRoute, categoryRoute, productRoute]);

app.listen();
