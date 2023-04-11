import dotenv from "dotenv";
dotenv.config({ path: process.env.ENV });
import { kafka } from "./kafka.js";

async function clickConsumer() {
  const consumer = kafka.consumer({ groupId: "test-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: "test", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
    },
  });
}
clickConsumer()
export { clickConsumer };