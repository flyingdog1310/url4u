import { pool } from "./mysql.js";

const createUrl = async (user_id, short_url, long_url) => {
  const [url_id] = await pool.query(
    "INSERT INTO urls SET user_id=?,short_url=? ,long_url=?",
    [user_id, short_url, long_url]
  );
  return url_id;
};

const getUrls = async () => {
  const [urls] = await pool.query("SELECT * FROM urls", []);
  return urls;
};

const getUrl = async (short_url) => {
  const [url] = await pool.query("SELECT * FROM urls WHERE short_url= ? ", [
    short_url,
  ]);
  return url;
};

export { createUrl, getUrls, getUrl };
