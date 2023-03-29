import { App } from './app';
import { UserRoute } from './api/user/user.route';
import { ValidateEnv } from './utils/validateEnv';

ValidateEnv();

const app = new App([new UserRoute()]);

app.listen();
