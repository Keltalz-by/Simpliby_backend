import { App } from './app';
import { UserRoute } from './api/user/user.route';
import { ValidateEnv } from './utils/validateEnv';
import { AuthRoute } from './api/auth/auth.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute()]);

app.listen();
