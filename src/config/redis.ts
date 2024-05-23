import { createClient } from "redis";
import { getEnvVariable } from "../utils/env";
const RedisClient = createClient({
  password: getEnvVariable("REDIS_PASSWORD"),
  socket: {
    host: getEnvVariable("REDIS_HOST"),
    port: parseInt(getEnvVariable("REDIS_PORT"), 10),
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
