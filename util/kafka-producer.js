import dotenv from "dotenv";
dotenv.config({ path: process.env.ENV });
import { kafka } from "./kafka.js";

async function clickEvent() {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: "clicks",
    messages: [{ value: "Hello KafkaJS user!" }],
  });
  await producer.disconnect();
}

export { clickEvent };
