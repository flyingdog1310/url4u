import { kafka } from "./kafka.js";
const producer = kafka.producer({ batchSize: 1000, linger: 100 });

async function clickEvent(topic, value) {
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [{ value: value }],
  });
}
setInterval(async () => {
  await producer.sendBatch();
}, 1000);

await producer.disconnect();
export { clickEvent };
