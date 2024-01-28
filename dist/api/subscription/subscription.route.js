"use strict";
// /* eslint-disable @typescript-eslint/no-misused-promises */
// import { type Routes } from '../../common';
// import { Router } from 'express';
// import { SubscriptionController } from './subscription.controller';
// import { deserializeUser } from '../../middlewares';
// export class SubscriptionRoute implements Routes {
//   public path = '/subscriptions/';
//   public router = Router();
//   public subscription = new SubscriptionController();
//   constructor() {
//     this.initializeRoutes();
//   }
//   private initializeRoutes() {
//     this.router.get(`${this.path}/callback`, this.subscription.callbackUrl);
//     this.router.use(deserializeUser);
//     this.router.post(`${this.path}`, this.subscription.subscribeToPlan);
//   }
// }
//# sourceMappingURL=subscription.route.js.map