import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV ?? 'development'}.local` });

export default {
  nodeEnv: 'NODE_ENV',

  port: 'PORT',
  dbUrl: 'DATABASE_URL',
  origin: 'ORIGIN',

  accessTokenPrivateKey: 'ACCESS_TOKEN_PRIVATE_KEY',
  accessTokenPublicKey: 'ACCESS_TOKEN_PUBLIC_KEY',
  refreshTokenPrivateKey: 'REFRESH_TOKEN_PRIVATE_KEY',
  refreshTokenPublicKey: 'REFRESH_TOKEN_PUBLIC_KEY',
  accessTokenExpiresIn: 'ACCESS_TOKEN_EXPIRESIN',
  refreshTokenExpiresIn: 'REFRESH_TOKEN_EXPIRESIN',

  logFormat: 'LOG_FORMAT',
  logDir: 'LOG_DIR',

  smtp: {
    user: 'EMAIL_USER',
    pass: 'EMAIL_PASS',
  },

  credentials: 'CREDENTIALS',
};
