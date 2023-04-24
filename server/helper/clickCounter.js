import { redis } from "../../util/cache.js";
import { kafka } from "../../util/kafka.js";

clickConsumer("clicks", "click-counter");

async function setClickCounter(time, clickMeta) {
  let counts;
  try {
    counts = await redis.zincrby(time, [1, clickMeta]);
  } catch (err) {
    console.error("setClickCounter: could not set clickMeta to redis");
    return;
  }
  console.log(`${clickMeta} has value: ${counts}`);
  redis.expire(time, 7200);
}

async function clickConsumer(topic, group) {
  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const clickRawMeta = message.value.toString();
      const clickMeta = await changeTime(clickRawMeta);
      const id = clickMeta.match(/\d+/)[0];
      const time = clickMeta.split("time:")[1].split(" referer")[0];
      let idTime = `${id}/${time}`;
      console.log(idTime, clickMeta);
      setClickCounter(idTime, clickMeta);
    },
  });
}

function changeTime(clickRawMeta) {
  let clickMeta = clickRawMeta.replace(/:\d{2}:\d{2}/, ":00:00");
  return clickMeta;
}

async function getClickCounter(idTime) {
  const result = await redis.zrange(idTime, 0, -1, "WITHSCORES");
  console.log(result);
  return result;
}
