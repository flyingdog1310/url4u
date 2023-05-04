import { pool } from "./mysql.js";

const createCompany = async (user_id, company_name) => {
  const [company_id] = await pool.query(
    `INSERT INTO company SET name = ? , level = ? `,
    [company_name, 0]
  );
  const [user_company] = await pool.query(
    `INSERT INTO role SET company_id = ? ,user_id= ? ,user_role = ?`,
    [company_id.insertId, user_id, 0]
  );
  return company_id;
};

const addCompanyUser = async (company_id, user_id, user_role) => {
  const [company_user] = await pool.query(
    `INSERT INTO role SET company_id = ? ,user_id= ? ,user_role = ?`,
    [company_id, user_id, user_role]
  );
  return company_user;
};

const checkUserCompany = async (company_id, user_id) => {
  const [userCompany] = await pool.query(
    `
  SELECT * FROM role WHERE company_id= ? AND user_id= ?`,
    [company_id, user_id]
  );
  return userCompany;
};

const getUrlsByCompany = async (company_id) => {
  const [urls] = await pool.query(
    `
  SELECT * FROM url WHERE company_id= ?`,
    [company_id]
  );
  return urls;
};

const getUrlsByUrl = async (url_id) => {
  const [urls] = await pool.query(
    `
  SELECT * FROM url 
  WHERE company_id = 
  (SELECT company_id FROM url WHERE id = ?)`,
    [url_id]
  );
  return urls;
};

const getUsersByCompany = async (company_id) => {
  const [users] = await pool.query(
    `SELECT role.user_id ,role.user_role ,user.name ,user.email
     FROM role 
     LEFT JOIN user 
     ON role.user_id = user.id
     WHERE company_id= ?`,
    [company_id]
  );
  return users;
};

export {
  createCompany,
  checkUserCompany,
  addCompanyUser,
  getUrlsByCompany,
  getUrlsByUrl,
  getUsersByCompany,
};
