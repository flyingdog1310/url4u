import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { Kafka } from "kafkajs";
import { createMechanism } from "@jm18457/kafkajs-msk-iam-authentication-mechanism";

const { KAFKA_CLIENT_ID, KAFKA_BROKER, KAFKA_SSL, KAFKA_REGION } = process.env;

const kafkaConfig = {
  clientId: KAFKA_CLIENT_ID,
  brokers: [KAFKA_BROKER],
  ssl: true,
  sasl: createMechanism({ region: KAFKA_REGION }),
};

if (KAFKA_SSL == "false") {
  kafkaConfig.ssl = undefined;
  kafkaConfig.sasl = undefined;
}

export const kafka = new Kafka(kafkaConfig);
