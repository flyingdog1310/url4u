import {
  createCompany,
  getUrlsByCompany,
  getUsersByCompany,
} from "../models/company_model.js";

const createUserCompany = async (req, res) => {
  const { company_name } = req.body;
  const user_id = res.locals.decoded.userId;
  const url = await createCompany(user_id, company_name);
  return res.status(200).redirect(`/company/${url.insertId}`);
};

const getShortUrlList = async (req, res) => {
  const company_id = req.originalUrl.split("/")[4];
  const url = await getUrlsByCompany(company_id);
  return res.status(200).json(url);
};

const getCompanyUser = async (req, res) => {
  const company_id = req.originalUrl.split("/")[4];
  const user = await getUsersByCompany(company_id);
  return res.status(200).json(user);
};

export { createUserCompany, getShortUrlList, getCompanyUser };
