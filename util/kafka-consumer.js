import dotenv from "dotenv";
dotenv.config({ path: process.env.ENV });
import { kafka } from "./kafka.js";

const consumer = kafka.consumer({ groupId: "test-group" });

await consumer.connect();
await consumer.subscribe({ topic: "clicks", fromBeginning: true });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    });
  },
});
