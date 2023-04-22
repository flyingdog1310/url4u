import dotenv from "dotenv";
dotenv.config();

import { Kafka } from "kafkajs";

const { KAFKA_CLIENT_ID, KAFKA_BROKER } = process.env;

const kafkaConfig = {
  clientId: KAFKA_CLIENT_ID,
  brokers: [KAFKA_BROKER],
};

const kafka = new Kafka(kafkaConfig);

export { kafka };
