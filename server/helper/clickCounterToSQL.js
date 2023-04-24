import { kafka } from "../../util/kafka.js";

clickConsumerForRedis("hourClick","hourClickToSQL")

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
        setClickCounter(id, clickMeta);
        setClickCounter(time, clickMeta);
      },
    });
  }