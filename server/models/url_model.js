import { pool } from "./mysql.js";

const createUrl = async (company_id, short_url, long_url) => {
  const [url_id] = await pool.query(
    "INSERT INTO urls SET company_id = ? ,short_url = ? ,long_url = ? ",
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
    "UPDATE urls SET short_url = ? ,long_url = ? , picture = ? , title = ? ,description = ? WHERE id = ? ",
    [short_url, long_url, picture, title, description, url_id]
  );
  return url;
};

const getUrlsByCompany = async (company_id) => {
  const [urls] = await pool.query("SELECT * FROM urls WHERE company_id= ?", [
    company_id,
  ]);
  return urls;
};

const getUrlById = async (url_id) => {
  const [url] = await pool.query("SELECT * FROM urls WHERE id = ? ", [url_id]);
  return url;
};

const getUrlByShortUrl = async (short_url) => {
  const [url] = await pool.query("SELECT * FROM urls WHERE short_url = ? ", [
    short_url,
  ]);
  return url;
};

export {
  createUrl,
  updateCustomUrl,
  getUrlsByCompany,
  getUrlById,
  getUrlByShortUrl,
};
