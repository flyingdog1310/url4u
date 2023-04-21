import {
  createCompany,
  getUrlsByCompany,
  getUrlsByUrl,
  getUsersByCompany,
} from "../models/company_model.js";

const createUserCompany = async (req, res) => {
  const { company_name } = req.body;
  const user_id = res.locals.decoded.userId;
  console.log(res.locals.decoded);
  const url = await createCompany(user_id, company_name);
  return res.status(200).redirect(`/company/${url.insertId}`);
};

const getShortUrlListByCompany = async (req, res) => {
  const company_id = req.originalUrl.split("/")[4];
  const url = await getUrlsByCompany(company_id);
  return res.status(200).json(url);
};

const getShortUrlListByUrl = async (req, res) => {
  const url_id = req.originalUrl.split("/")[5];
  console.log(url_id);
  const url = await getUrlsByUrl(url_id);
  return res.status(200).json(url);
};

const getCompanyUser = async (req, res) => {
  const company_id = req.originalUrl.split("/")[4];
  const user = await getUsersByCompany(company_id);
  return res.status(200).json(user);
};

export {
  createUserCompany,
  getShortUrlListByCompany,
  getShortUrlListByUrl,
  getCompanyUser,
};
