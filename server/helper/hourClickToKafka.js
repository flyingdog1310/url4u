import { redis } from "../../util/cache.js";
import { kafka } from "../../util/kafka.js";
import { clickEvent } from "../../util/kafka-producer.js";
//this should be triggered once a hour

getLastHourClick();
//get from redis
async function getLastHourClick() {
  let now = new Date();
  //now.setHours(now.getHours() - 1);
  const start =
    now.toISOString().slice(0, 19).replace("T", " ").split(":")[0] + ":00:00";

  const lastHour = await getClickCounter(start);
  console.log(lastHour);
  clickEvent("hourClick", lastHour);
}

async function getClickCounter(time) {
  const result = await redis.zrange(time, 0, -1, "WITHSCORES");
  console.log(result);
  return result;
}
