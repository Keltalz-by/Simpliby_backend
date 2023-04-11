import { createClient } from 'redis';
import { logger } from './logger';

const redisClient = createClient();

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
