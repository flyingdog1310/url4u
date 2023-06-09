import { pool } from "../database/mysql.js";

const createUser = async (provider, name, email, password) => {
  const [user_id] = await pool.query(
    `
    INSERT INTO user 
    SET provider = ? ,name = ? ,email = ? ,password = ? `,
    [provider, name, email, password]
  );
  return user_id;
};

async function userSignIn(email) {
  const [user] = await pool.query(
    `
  SELECT *
  FROM user
  WHERE  email = ? ;
  `,
    [email]
  );
  return user[0];
}
const getCompanyByUser = async (user_id) => {
  const [user_company] = await pool.query(
    `
    SELECT role.user_id, role.user_role ,company.id ,company.name,company.level
    FROM role 
    LEFT JOIN company 
    ON role.company_id = company.id
    WHERE user_id = ? `,
    [user_id]
  );
  return user_company;
};

const getRoleByUserCompany = async (user_id, company_id) => {
  const [user_role] = await pool.query(
    `
    SELECT role.user_role 
    FROM role 
    WHERE user_id = ? AND company_id = ? `,
    [user_id, company_id]
  );
  return user_role[0];
};

const getRoleByUserUrl = async (user_id, url_id) => {
  const [user_role] = await pool.query(
    `
    SELECT role.user_role 
    FROM role 
    WHERE user_id = ? AND company_id = (SELECT company_id FROM url WHERE id = ?) `,
    [user_id, url_id]
  );
  return user_role[0];
};

export { createUser, userSignIn, getCompanyByUser, getRoleByUserCompany, getRoleByUserUrl };
