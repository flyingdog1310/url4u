import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });

import Redis from "ioredis";

const { REDIS_HOST, REDIS_PORT, REDIS_USER, REDIS_PASSWORD, REDIS_TLS_ENABLE } = process.env;

const redisConfig = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  username: REDIS_USER,
  password: REDIS_PASSWORD,
  lazyConnect: true,
  tls: {},
  retryStrategy(times) {
    console.log(`***Retrying redis connection: attempt ${times}***`);
    console.log(`***redis.status: ${redis.status}***`);
    if (times < 4) {
      return 1000 * 1;
    }
    return 1000 * 5;
  },
};
if (REDIS_TLS_ENABLE == "false") {
  redisConfig.tls = undefined;
}

const redis = new Redis(redisConfig);

async function setUrlCache(short_url, long_url) {
  let newUrl = {};
  newUrl[short_url] = long_url;
  const setCache = await redis.hset("url", newUrl);
  console.log("set cache", setCache);
}

async function getUrlCache(short_url) {
  const getCache = await redis.hget("url", short_url);
  console.log("get cache", getCache);
  return getCache;
}

export { redis, setUrlCache, getUrlCache };
