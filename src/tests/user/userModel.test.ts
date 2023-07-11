// import { redisClient } from '../../utils';
// import { type RegisterInput } from '../../api/auth/auth.schema';
// import { AuthService } from '../../api/auth/auth.service';
// import { connect, closeDb, clearDb, teardown } from '../__helper__/setup';

// const userData: RegisterInput = {
//   name: 'John Doe',
//   email: 'jdoe@gmail.com',
//   password: '12345678',
//   passwordConfirm: '12345678'
// };

// describe('User Model Test', () => {
//   beforeAll(connect);
//   beforeEach(clearDb);
//   afterAll(async () => {
//     await teardown(redisClient);
//     await closeDb();
//   });

//   it('should create a new user', async () => {
//     const authService = new AuthService();
//     const newUser = await authService.signup(userData);

//     expect(newUser).toEqual(
//       expect.objectContaining({
//         id: expect.anything(),
//         name: userData.name,
//         email: userData.email
//       })
//     );
//   });
// });
