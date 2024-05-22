import { createClient } from "redis";

const RedisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "6379"),
  },
});

RedisClient.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  try {
    await RedisClient.connect();
    console.log("Redis client connected");
  } catch (err) {
    console.error("Error connecting to Redis:", err);
  }
})();

export default RedisClient;
