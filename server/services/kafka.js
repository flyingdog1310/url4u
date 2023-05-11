import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });

import { Kafka } from "kafkajs";

const { KAFKA_CLIENT_ID, KAFKA_BROKER } = process.env;

const kafkaConfig = {
  clientId: KAFKA_CLIENT_ID,
  brokers: [KAFKA_BROKER],
};

const kafka = new Kafka(kafkaConfig);

export { kafka };
