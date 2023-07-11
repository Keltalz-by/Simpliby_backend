// import request from 'supertest';
// import { App } from '../app';
// import { AuthRoute } from '../api/auth/auth.route';
// import { closeDb, teardown } from './__helper__/setup';
// import { type RegisterInput } from '../api/auth/auth.schema';
// import { redisClient } from '../utils';

// afterAll(async () => {
//   await teardown(redisClient);
//   // await new Promise<void>((resolve) =>
//   //   setTimeout(() => {
//   //     resolve();
//   //   }, 1000)
//   // );
//   await closeDb();
// }, 100000);

// describe('Test Authentication', () => {
//   describe('User registration POST /auth/register', () => {
//     it('should create a new user', async () => {
//       const authRoute = new AuthRoute();
//       const app = new App([authRoute]);
//       const res = await request(app.runServer()).post(`${authRoute.path}register`).send(userData);
//       expect(res.statusCode).toBe(201);
//       console.log(res.body);
//     });
//   });
// });
