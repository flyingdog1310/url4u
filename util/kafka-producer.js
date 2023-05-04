import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });

import { kafka } from "./kafka.js";

const { KAFKA_PRODUCER_BATCH_LENGTH, KAFKA_PRODUCER_BATCH_FREQ } = process.env;
const producer = kafka.producer();

async function clickEvent(topic, value) {
  await producer.connect();
  producer.send({
    topic: topic,
    messages: [{ value: value }],
  });
}
//Code for Batch Send
let dataArr = [];
let batchCount = 0;
let sendPromise = Promise.resolve();

async function dataToBatch(topic, value) {
  let data = {};
  data = {
    topic: topic,
    messages: [{ value: value }],
  };
  dataArr.push(data);
  batchCount++;
  if (batchCount >= KAFKA_PRODUCER_BATCH_LENGTH) {
    const sendingArr = dataArr;
    batchCount = 0;
    dataArr = [];
    await sendPromise;
    sendPromise = clickEventBatch(sendingArr);
  }
}

setInterval(async function () {
  if (batchCount == 0) {
    return;
  }
  const sendingArr = dataArr;
  batchCount = 0;
  dataArr = [];
  sendPromise = clickEventBatch(sendingArr);
}, KAFKA_PRODUCER_BATCH_FREQ);

async function clickEventBatch(topicMessages) {
  await producer.connect();
  producer.sendBatch({
    topicMessages,
  });
}

await producer.disconnect();
export { clickEvent, clickEventBatch, dataToBatch };
