import dotenv from "dotenv";
dotenv.config({ path: process.env.ENV });
import { Kafka } from "kafkajs";

const { KAFKA_CLIENT_ID, KAFKA_BROKER1, KAFKA_BROKER2, KAFKA_BROKER3 } =
  process.env;

const kafka = new Kafka({
  clientId: KAFKA_CLIENT_ID,
  brokers: [KAFKA_BROKER1, KAFKA_BROKER2, KAFKA_BROKER2],
});

export { kafka };
