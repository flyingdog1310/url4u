import {
  createCompany,
  getCompany,
  getUrlsByCompany,
} from "../models/company_model.js";

const createUserCompany = async (req, res) => {
  const {
    //user_id,
    company_name,
  } = req.body;
  const user_id = 1;
  const url = await createCompany(user_id, company_name);
  return res.status(200).redirect(`/company/${url.insertId}`);
};

const getUserCompany = async (req, res) => {
  const {
    //user_id,
  } = req.body;
  const user_id = 1;
  const user_company = await getCompany(user_id);
  console.log(user_company);
  return res.status(200).json(user_company);
};

const getShortUrlList = async (req, res) => {
  const company_id = req.originalUrl.split("/")[4];
  const url = await getUrlsByCompany(company_id);
  return res.status(200).json(url);
};

export { createUserCompany, getUserCompany, getShortUrlList };
