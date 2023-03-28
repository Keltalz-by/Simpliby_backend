import { App } from '@src/app';
import { UserRoute } from './api/user/user.route';

const app = new App([new UserRoute()]);

app.listen();
