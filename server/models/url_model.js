import { pool } from "./mysql.js";

const createUrl = async (company_id, short_url, long_url) => {
  const [url_id] = await pool.query(
    "INSERT INTO url SET company_id = ? ,short_url = ? ,long_url = ? ",
    [company_id, short_url, long_url]
  );
  return url_id;
};

const updateCustomUrl = async (
  url_id,
  short_url,
  long_url,
  picture,
  title,
  description
) => {
  const [url] = await pool.query(
    "UPDATE url SET short_url = ? ,long_url = ? , picture = ? , title = ? ,description = ? WHERE id = ? ",
    [short_url, long_url, picture, title, description, url_id]
  );
  return url;
};

const getUrlById = async (url_id) => {
  const [url] = await pool.query("SELECT * FROM url WHERE id = ? ", [url_id]);
  return url;
};

const getUrlByShortUrl = async (short_url) => {
  const [url] = await pool.query("SELECT * FROM url WHERE short_url = ? ", [
    short_url,
  ]);
  return url[0];
};

export { createUrl, updateCustomUrl, getUrlById, getUrlByShortUrl };
