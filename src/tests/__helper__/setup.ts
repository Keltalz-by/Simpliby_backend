import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

export const connect = async (): Promise<void> => {
  try {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await mongoose.connect(uri);
    console.log('== Test Database Connected ==');
    console.log(`============================`);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const closeDb = async () => {
  await mongoose.disconnect();
  await mongod.stop();
};

export const clearDb = async () => {
  await mongoose.connection.db.dropDatabase();
};

export const teardown = async (redis: any) => {
  await new Promise((resolve) => {
    redis.quit();
    redis.on('end', resolve);
  });
};
