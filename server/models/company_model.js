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

const getUrlsByCompany = async (company_id) => {
  const [urls] = await pool.query("SELECT * FROM url WHERE company_id= ?", [
    company_id,
  ]);
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

export { createCompany, getUrlsByCompany, getUsersByCompany };
