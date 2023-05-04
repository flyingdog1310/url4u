import mysql from "mysql2";

const { MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE } =
  process.env;

const mysqlConfig = {
  host: MYSQL_HOST,
  user: MYSQL_USERNAME,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
};

export const pool = mysql.createPool(mysqlConfig).promise();
