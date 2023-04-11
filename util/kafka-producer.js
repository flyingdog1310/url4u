import dotenv from "dotenv";
dotenv.config({ path: process.env.ENV });
import { kafka } from "./kafka.js";

async function clickEvent() {
  const producer = kafka.producer();
  await producer.connect();
  await producer.send({
    topic: "test",
    messages: [{ value: "Hello KafkaJS user!" }],
  });
  await producer.disconnect();
}
clickEvent()
export { clickEvent };
