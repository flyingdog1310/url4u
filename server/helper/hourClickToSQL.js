import { redis } from "../../util/cache.js";
import { createClick } from "../models/ad_model.js";
//this should be triggered once a hour

setLastHourClickToSQL();

async function setLastHourClickToSQL() {
  let now = new Date();
  now.setHours(now.getHours() - 1);
  const start =
    now.toISOString().slice(0, 19).replace("T", " ").split(":")[0] + ":00:00";
  console.log(start);
  const lastHour = await getClickCounter(start);
  console.log(lastHour);

  for (let i = 0; i < lastHour.length; i++) {
    const clickMeta = lastHour[i][0];
    const count = lastHour[i][1];
    const id = clickMeta.match(/\d+/)[0];
    const time = clickMeta.split("time:")[1].split(" referer")[0];
    const referrer = clickMeta.split("referer:")[1].split(" device")[0];
    const device = clickMeta.split("device:")[1].split(" ip")[0];
    const ip = clickMeta.split("ip:")[1].split("}")[0];
    createClick(id, time, referrer, device, ip, count);
  }
  console.log("click insert end");
  process.exit(0);
}

async function getClickCounter(time) {
  const result = await redis.hgetall(time);
  const resultArr = Object.entries(result);
  return resultArr;
}
