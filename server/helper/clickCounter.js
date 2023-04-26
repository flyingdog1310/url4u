import { redis } from "../../util/cache.js";
import { kafka } from "../../util/kafka.js";
import { insertClick, getClick } from "../../util/cassandra.js";

clickConsumerForRedis("clicks", "test");
//clickConsumerForCassandra("clicks", "click-counter-cassandra");

async function clickConsumerForRedis(topic, group) {
  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const clickRawMeta = message.value.toString();
      const clickMeta = await changeTime(clickRawMeta);
      const id = clickMeta.match(/\d+/)[0];
      const time = clickMeta.split("time:")[1].split(" referer")[0];

      console.log(clickMeta);
      setClickCounter(`${id}/${time}`, clickMeta);
      setClickCounter(time, clickMeta);
    },
  });
}
//click storage for redis
async function setClickCounter(key, value) {
  let counts;
  try {
    counts = await redis.hincrby(key, value, 1);
  } catch (err) {
    console.error("setClickCounter: could not set clickMeta to redis");
    return;
  }
  console.log(`key:${key}field:${value} has value: ${counts}`);
  redis.expire(key, 7200);
}

function changeTime(clickRawMeta) {
  let clickMeta = clickRawMeta.replace(/:\d{2}:\d{2}/, ":00:00");
  return clickMeta;
}

//click storage for cassandra
async function clickConsumerForCassandra(topic, group) {
  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const clickRawMeta = message.value.toString();
      const id = clickRawMeta.match(/\d+/)[0];
      const time = clickRawMeta.split("time:")[1].split(" referer")[0];
      const referrer = clickRawMeta.split("referer:")[1].split(" device")[0];
      const device = clickRawMeta.split("device:")[1].split(" ip")[0];
      const ip = clickRawMeta.split("ip:")[1].split("}")[0];
      console.log(id, time, referrer, device, ip);
      const result = await insertClick(id, time, referrer, device, ip);
      console.log(result);
    },
  });
}

//get data from cassandra
async function getClickFromCassandra(Time) {
  let now = new Date();
  now.setHours(now.getHours() - 1);
  const start =
    now.toISOString().slice(0, 19).replace("T", " ").split(":")[0] + ":00:00";
  const stop =
    now.toISOString().slice(0, 19).replace("T", " ").split(":")[0] + ":59:59";

  let result = await getClick(stop, start);
  console.log(result);
  return result;
}
