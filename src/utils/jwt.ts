import jwt from 'jsonwebtoken';
import { logger } from './logger';

export function signJwt(payload: Object, key: string, options: jwt.SignOptions = {}) {
  const privateKey = Buffer.from(key, 'base64').toString('ascii');
  return jwt.sign(payload, privateKey, {
    ...(Boolean(options) && options),
    algorithm: 'RS256'
  });
}

export function verifyJwt<T>(token: string, key: string): T | null {
  try {
    const publicKey = Buffer.from(key, 'base64').toString('ascii');

    const decoded = jwt.verify(token, publicKey) as T;
    return decoded;
  } catch (err: any) {
    logger.error(err.message);
    return null;
  }
}
