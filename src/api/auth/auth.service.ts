import { type DocumentType } from '@typegoose/typegoose';
import { omit } from 'lodash';
import {
  ACCESS_TOKEN_EXPIRESIN,
  REFRESH_TOKEN_EXPIRESIN,
  ACCESS_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PRIVATE_KEY
} from '../../config';
import UserModel, { privateFields, type User } from '../user/user.model';
import { redisClient, signJwt } from '../../utils';

export class AuthService {
  public async signup(userData: Partial<User>) {
    return await UserModel.create(userData);
  }

  public async signToken(user: DocumentType<User>) {
    const accessToken = signJwt({ sub: user._id }, ACCESS_TOKEN_PRIVATE_KEY as string, {
      expiresIn: ACCESS_TOKEN_EXPIRESIN
    });

    const refreshToken = signJwt({ sub: user._id }, REFRESH_TOKEN_PRIVATE_KEY as string, {
      expiresIn: REFRESH_TOKEN_EXPIRESIN
    });

    await redisClient.set(JSON.stringify(user._id), JSON.stringify(user.toJSON(), omit(privateFields)), {
      EX: 60 * 60
    });

    return { accessToken, refreshToken };
  }
}
