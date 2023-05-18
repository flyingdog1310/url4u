import { pool } from "../database/mysql.js";

const createUrl = async (company_id, short_url, long_url) => {
  const [url_id] = await pool.query(
    `
    INSERT INTO url 
    SET company_id = ? ,short_url = ? ,long_url = ? `,
    [company_id, short_url, long_url]
  );
  return url_id;
};

const updateUrlCompany = async (url_id, company_id) => {
  let query = `UPDATE url SET company_id = ? WHERE id = ? `;
  const [result] = await pool.query(query, [company_id, url_id]);
  return result;
};

const updateCustomUrl = async (url_id, short_url, long_url, picture, title, description) => {
  let query = "UPDATE url SET";
  const params = [];
  if (short_url) {
    query += " short_url = ?,";
    params.push(short_url);
  }
  if (long_url) {
    query += " long_url = ?,";
    params.push(long_url);
  }
  if (picture) {
    query += " picture = ?,";
    params.push(picture);
  }
  query += " title = ?, description = ?,";
  params.push(title);
  params.push(description);

  query = query.slice(0, -1);
  query += " WHERE id = ?";

  params.push(url_id);
  const [url] = await pool.query(query, params);
  return url;
};

const getUrlById = async (url_id) => {
  const [url] = await pool.query(`SELECT * FROM url WHERE id = ? `, [url_id]);
  return url;
};

const getUrlByShortUrl = async (short_url) => {
  const [url] = await pool.query(`SELECT * FROM url WHERE short_url = ? `, [short_url]);
  return url[0];
};

export { createUrl, updateUrlCompany, updateCustomUrl, getUrlById, getUrlByShortUrl };
