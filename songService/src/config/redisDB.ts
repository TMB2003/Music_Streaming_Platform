import redis from "redis";
import dotenv from "dotenv";
dotenv.config();

export const redisDB = async () => {
  const client = redis.createClient({
    password: process.env['REDIS_PASSWORD']!,
    socket: {
      host: process.env['REDIS_HOST'],
      port: Number(process.env['REDIS_PORT']),
    },
  });

  try {
    await client.connect();
    console.log("Connected to Redis successfully");
    return client;
  } catch (err) {
    console.error("Redis connection failed:", err);
    throw err;
  }
};
