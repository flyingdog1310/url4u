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
const getTotalClickFromRedis = async (urls_id) => {
  let now = new Date();
  now.setHours(now.getHours());
  const start =
    now.toISOString().slice(0, 19).replace("T", " ").split(":")[0] + ":00:00";
  const result = await redis.hget(`total/${start}`, urls_id);
  return result;
};

const getDeviceClickFromSQL = async (urls_id) => {
  const [source] = await pool.query(
    "SELECT DISTINCT device AS source FROM click Where url_id=?",
    [urls_id]
  );
  for (let i = 0; i < source.length; i++) {
    const [total] = await pool.query(
      "SELECT SUM(count) AS total FROM click Where url_id=? AND device = ?",
      [urls_id, source[i].source]
    );
    source[i].total = total[0]["total"];
  }
  return source;
};

const getDeviceClickFromRedis = async (urls_id) => {
  let now = new Date();
  now.setHours(now.getHours());
  const start =
    now.toISOString().slice(0, 19).replace("T", " ").split(":")[0] + ":00:00";

  const result = await redis.hgetall(`${urls_id}/${start}/device`);
  const resultArr = Object.entries(result);
  return resultArr;
};

const getRegionClickFromSQL = async (urls_id) => {
  const [source] = await pool.query(
    "SELECT DISTINCT region AS source FROM click Where url_id=?",
    [urls_id]
  );
  for (let i = 0; i < source.length; i++) {
    const [total] = await pool.query(
      "SELECT SUM(count) AS total FROM click Where url_id=? AND region = ?",
      [urls_id, source[i].source]
    );
    source[i].total = total[0]["total"];
  }
  return source;
};

const getRegionClickFromRedis = async (urls_id) => {
  let now = new Date();
  now.setHours(now.getHours());
  const start =
    now.toISOString().slice(0, 19).replace("T", " ").split(":")[0] + ":00:00";

  const result = await redis.hgetall(`${urls_id}/${start}/ip`);
  const resultArr = Object.entries(result);
  return resultArr;
};

const getReferrerClickFromSQL = async (urls_id) => {
  const [source] = await pool.query(
    "SELECT DISTINCT referrer AS source FROM click Where url_id=?",
    [urls_id]
  );
  for (let i = 0; i < source.length; i++) {
    const [total] = await pool.query(
      "SELECT SUM(count) AS total FROM click Where url_id=? AND referrer = ?",
      [urls_id, source[i].source]
    );
    source[i].total = total[0]["total"];
  }
  return source;
};

const getReferrerClickFromRedis = async (urls_id) => {
  let now = new Date();
  now.setHours(now.getHours());
  const start =
    now.toISOString().slice(0, 19).replace("T", " ").split(":")[0] + ":00:00";

  const result = await redis.hgetall(`${urls_id}/${start}/referer`);
  const resultArr = Object.entries(result);
  return resultArr;
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

const getWeekClickFromSQL = async (urls_id) => {
  const [total] = await pool.query(
    `
    SELECT  
        DAYOFWEEK(time_range) as weekday, 
        SUM(count) as total_count
    FROM 
        click
    WHERE 
        url_id = ?
    GROUP BY 
        DAYOFWEEK(time_range)
    ORDER BY 
        weekday
  `,
    [urls_id]
  );

  return total;
};

const getTopClickFromSQL = async (urls_id) => {
  const [total] = await pool.query(
    `
    SELECT time_range, SUM(count) AS count
    FROM click
    WHERE url_id = ?
    GROUP BY time_range
    ORDER BY count DESC, time_range ASC
    LIMIT 5;
  `,
    [urls_id]
  );

  return total;
};


export {
  createClick,
  getTotalClickFromSQL,
  getTotalClickFromRedis,
  getDeviceClickFromSQL,
  getDeviceClickFromRedis,
  getRegionClickFromSQL,
  getRegionClickFromRedis,
  getReferrerClickFromSQL,
  getReferrerClickFromRedis,
  getTimeClickFromSQL,
  getWeekClickFromSQL,
  getTopClickFromSQL
};
