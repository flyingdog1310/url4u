import { emailValidator } from "../../util/validator.js";
import { hashPassword, verifyPassword } from "../../util/password.js";
import { issueJWT, verifyJWT } from "../../util/token.js";
import {
  createUser,
  userSignIn,
  getCompanyByUser,
} from "../models/user_model.js";
import { createCompany } from "../models/company_model.js";

const createNewUser = async function (req, res) {
  let provider = "";
  const { name, email, password } = req.body;
  let emailValidate = await emailValidator(email);
  if (!emailValidate) {
    res.status(400).json("email format is wrong");
    return;
  }
  if (!password === "") {
    res.status(400).json("lack of password");
    return;
  }
  if (!name === "") {
    res.status(400).json("lack of name");
    return;
  }
  const hashedPassword = await hashPassword(password);
  if (provider == "") {
    provider = "native";
    const newUser = await createUser(provider, name, email, hashedPassword);
    if (newUser) {
      const userId = newUser.insertId;
      const createDefaultCompany = await createCompany(userId, "My Urls");
      const access_token = await issueJWT(userId, provider);
      console.log({ data: { access_token, access_expired: 3600 } });
      res.status(200).json({ data: { access_token, access_expired: 3600 } });
      return;
    } else {
      res.status(403).json("email already exist");
      return;
    }
  }
};

const checkUser = async function (req, res) {
  const { email, password } = req.body;
  const lookup = await userSignIn(email);
  if (!lookup) {
    res.status(400).json("Email is not registered");
    return;
  }
  const hashedPassword = lookup[0].password;
  console.log(lookup);
  const verify = await verifyPassword(hashedPassword, password);
  if (verify) {
    const userId = lookup[0].id;
    const provider = lookup[0].provider;
    const access_token = await issueJWT(userId, provider);
    console.log({ data: { access_token, access_expired: 3600 } });
    res.status(200).json({ data: { access_token, access_expired: 3600 } });
    return;
  } else {
    res.status(403).json("Password is wrong");
    return;
  }
};

const getUserCompany = async (req, res) => {
  const user_id = res.locals.decoded.userId;
  const user_company = await getCompanyByUser(user_id);
  console.log(user_company);
  return res.status(200).json(user_company);
};

export { createNewUser, checkUser, getUserCompany };
