import request from 'supertest';
import { App } from '../../app';
import { authRoute } from './auth.route';

describe('Testing Auth Endpoints', () => {
  describe('POST /auth/register', () => {
    it('should create a new user', async () => {
      const res = (await request(new App([authRoute])).post('/api/v1/auth/register')).send({
        name: 'Jane Doe',
        email: 'jdoe@gmail.com',
        password: '1331Axxa@',
        passwordConfirm: '1331Axxa@'
      });
      expect(res.statusCode).toBe(201);
    });
  });
});
