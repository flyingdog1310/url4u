import { kafka } from "./kafka.js";
const producer = kafka.producer();

async function clickEvent(topic, value) {
  await producer.connect();
  producer.send({
    topic: topic,
    messages: [{ value: value }],
  });
}

async function clickEventBatch(topicMessages) {
  await producer.connect();
  producer.sendBatch({
    topicMessages,
  });
}

await producer.disconnect();
export { clickEvent, clickEventBatch };
