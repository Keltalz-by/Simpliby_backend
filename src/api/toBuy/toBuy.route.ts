// /* eslint-disable @typescript-eslint/no-misused-promises */
// import { Router } from 'express';
// import { type Routes } from '../../common';
// import { deserializeUser, validateResource } from '../../middlewares';
// import { ToBuyController } from './toBuy.controller';
// import { createToBuySchema } from './toBuy.schema';

// export class ToBuyRoute implements Routes {
//   public path = '/tobuy/';
//   public router = Router();
//   public toBuy = new ToBuyController();

//   constructor() {
//     this.initializeRoutes();
//   }

//   private initializeRoutes() {
//     this.router.use(deserializeUser);
//     this.router.post(`${this.path}`, validateResource(createToBuySchema), this.toBuy.createToBuy);
//     this.router.patch(`${this.path}:id`, this.toBuy.completeToBuy);
//     this.router.delete(`${this.path}:id`, this.toBuy.deleteToBuy);
//   }
// }
