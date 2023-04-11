import { createClient } from 'redis';
import { logger } from './logger';
import { REDIS_URL } from '../config';

const redisClient = createClient({
  url: REDIS_URL
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    logger.info('Connected to redis db');
  } catch (err: any) {
    logger.error(err.message);
  }
};

void connectRedis();

redisClient.on('error', (err: any) => logger.error(err.message));

export default redisClient;
