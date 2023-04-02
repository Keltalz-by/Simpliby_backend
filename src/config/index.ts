import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { NODE_ENV, PORT, DATABASE_URL, ORIGIN, LOG_FORMAT, LOG_DIR, EMAIL_USER, EMAIL_PASS, SERVICE } =
  process.env;
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
