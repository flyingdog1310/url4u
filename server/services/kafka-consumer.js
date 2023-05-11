import { kafka } from "./kafka.js";

async function clickConsumer(topic, group) {
  const consumer = kafka.consumer({ groupId: group });
  await consumer.connect();
  await consumer.subscribe({ topic: topic, fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
}
clickConsumer("clicks", "consumer");

export { clickConsumer };
