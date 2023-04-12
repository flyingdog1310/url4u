import dotenv from "dotenv";
dotenv.config({ path: process.env.ENV });
import { kafka } from "./kafka.js";

async function clickEvent(topic,value) {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [{ value: value }],
  });
  await producer.disconnect();
}
export { clickEvent };
