import { pool } from "./mysql.js";
import { redis } from "../../util/cache.js";

const createClick = async (
  urls_id,
  time_range,
  referrer,
  device,
  region,
  count
) => {
  const [url_id] = await pool.query(
    `INSERT INTO click SET url_id = ?,time_range = ?,referrer = ?,device = ?,region = ?,count = ?`,
    [urls_id, time_range, referrer, device, region, count]
  );
  return url_id;
};

const getTotalClickFromSQL = async (urls_id) => {
  const [totalClickCount] = await pool.query(
    `SELECT SUM(count) AS total FROM click WHERE url_id = ?`,
    [urls_id]
  );
  return totalClickCount;
};
const getTotalClickFromRedis = async (urls_id) =>{
  let now = new Date();
  now.setHours(now.getHours());
  const start =
    now.toISOString().slice(0, 19).replace("T", " ").split(":")[0] + ":00:00";
  console.log(start);

  const result = await redis.hget(start ,urls_id);
  console.log(result);
  return result;
}

const getDeviceClickFromSQL = async (urls_id) => {
  const [device] = await pool.query(
    "SELECT DISTINCT device FROM click Where url_id=?",
    [urls_id]
  );
  for (let i = 0; i < device.length; i++) {
    const [total] = await pool.query(
      "SELECT SUM(count) AS total FROM click Where url_id=? AND device = ?",
      [urls_id, device[i].device]
    );
    device[i].total = total[0]["total"];
  }
  return device;
};

const getRegionClickFromSQL = async (urls_id) => {
  const [region] = await pool.query(
    "SELECT DISTINCT region FROM click Where url_id=?",
    [urls_id]
  );
  for (let i = 0; i < region.length; i++) {
    const [total] = await pool.query(
      "SELECT SUM(count) AS total FROM click Where url_id=? AND region = ?",
      [urls_id, region[i].region]
    );
    region[i].total = total[0]["total"];
  }
  return region;
};

const getReferrerClickFromSQL = async (urls_id) => {
  const [referrer] = await pool.query(
    "SELECT DISTINCT referrer FROM click Where url_id=?",
    [urls_id]
  );
  for (let i = 0; i < referrer.length; i++) {
    const [total] = await pool.query(
      "SELECT SUM(count) AS total FROM click Where url_id=? AND referrer = ?",
      [urls_id, referrer[i].referrer]
    );
    referrer[i].total = total[0]["total"];
  }
  return referrer;
};

const getTimeClickFromSQL = async (urls_id, time) => {
  const referer = [];
  for (let i = 0; i < time.length; i++) {
    const [total] = await pool.query(
      "SELECT SUM(count) AS total FROM click Where url_id=? AND time_range BETWEEN ? AND ? ",
      [urls_id, time[i].start, time[i].stop]
    );
    referer[i] = {};
    referer[i].total = total[0]["total"];
    referer[i].time = time[i].start;
  }
  return referer;
};

export {
  createClick,
  getTotalClickFromSQL,
  getTotalClickFromRedis,
  getDeviceClickFromSQL,
  getRegionClickFromSQL,
  getReferrerClickFromSQL,
  getTimeClickFromSQL,
};
