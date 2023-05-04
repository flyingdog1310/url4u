import {
  createCompany,
  getUrlsByCompany,
  getUrlsByUrl,
  getUsersByCompany,
} from "../models/company_model.js";
import { userSignIn } from "../models/user_model.js";

const createUserCompany = async (req, res) => {
  const { company_name } = req.body;
  const user_id = res.locals.decoded.userId;
  console.log(res.locals.decoded);
  const url = await createCompany(user_id, company_name);
  return res.status(200).redirect(`/company/${url.insertId}`);
};
const createCompanyUser = async (req, res) => {
  const { user_role, user_email } = req.body;
  const user_id = res.locals.decoded.userId;
  const company_id = req.originalUrl.split("/")[4];
  const newUser = await userSignIn(user_email);
  if(!newUser[0]){
    return res.status(400).json("no user with such email")
  }
  console.log(newUser)
  //const newUser = await createCompanyUser(company_id,user_id,user_role );
  return res
    .status(200)
    .redirect(`/company/${req.originalUrl.split("/")[4]}/user`);
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
  createCompanyUser,
  getShortUrlListByCompany,
  getShortUrlListByUrl,
  getCompanyUser,
};
