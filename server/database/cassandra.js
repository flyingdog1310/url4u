import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../../.env" });

import cassandra from "cassandra-driver";

const {
  CASSANDRA_USER,
  CASSANDRA_PASS,
  CASSANDRA_CONTACT_POINT,
  CASSANDRA_LOCAL_DATA_CENTER,
  CASSANDRA_KEY_SPACE,
} = process.env;

const authProvider = new cassandra.auth.PlainTextAuthProvider(
  CASSANDRA_USER,
  CASSANDRA_PASS
);

export const client = new cassandra.Client({
  contactPoints: [
    CASSANDRA_CONTACT_POINT,
    //process.env.CASSANDRA_CONTACT_POINT2,
    //process.env.CASSANDRA_CONTACT_POINT3,
  ],
  localDataCenter: CASSANDRA_LOCAL_DATA_CENTER,
  authProvider,
  keyspace: CASSANDRA_KEY_SPACE,
});

const insertClick = async (urlId, time, referrer, device, region) => {
  let params = [urlId, time, referrer, device, region];
  const query = `INSERT INTO click (uid, urlId, time ,referrer, device ,region) VALUES (blobAsUuid(timeuuidAsBlob(now())),?,?,?,?,?);`;
  const options = { prepare: true };
  const result = await client.execute(query, params, options);
  return result;
};

//FIXME: modify later
const getClick = async (start, end) => {
  let params = [start, end];
  const query = `SELECT * FROM click WHERE time <= ? and time >= ? ALLOW FILTERING`;
  const options = { prepare: true };
  const result = await client.execute(query, params, options);
  return result;
};

export { insertClick, getClick };
