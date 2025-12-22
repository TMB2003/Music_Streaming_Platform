import redis from "redis";
import dotenv from "dotenv";
dotenv.config();
export const redisConnect = redis.createClient({
    password: process.env['REDIS_PASSWORD'],
    socket: {
        host: process.env['REDIS_HOST'],
        port: Number(process.env['REDIS_PORT']),
    },
});
export const redisDB = async () => {
    try {
        await redisConnect.connect();
        console.log("Connected to Redis successfully");
        return redisConnect;
    }
    catch (err) {
        console.error("Redis connection failed:", err);
        throw err;
    }
};
