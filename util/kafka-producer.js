import { kafka } from "./kafka.js";
const producer = kafka.producer();
async function clickEvent(topic, value) {
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [{ value: value }],
  });
}

await producer.disconnect();
export { clickEvent };
