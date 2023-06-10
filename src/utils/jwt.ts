import jwt from 'jsonwebtoken';
import { logger } from './logger';

export function signJwt(payload: Object, key: string, options: jwt.SignOptions = {}) {
  const privateKey = Buffer.from(key, 'base64').toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(Boolean(options) && options),
    algorithm: 'RS256'
  });
}

export const verifyJwt = <T>(token: string, key: string): T | null => {
  try {
    const publicKey = Buffer.from(key, 'base64').toString('ascii');

    return jwt.verify(token, publicKey) as T;
  } catch (err: any) {
    logger.error(err.message);
    return null;
  }
};
