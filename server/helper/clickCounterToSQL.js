import { kafka } from "../../util/kafka.js";

clickConsumerForRedis("hourClick", "hourClickToSQL");

async function clickConsumerForRedis(topic, group) {
  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const clickMeta = message.value.toString();
      console.log(clickMeta);
    },
  });
}
