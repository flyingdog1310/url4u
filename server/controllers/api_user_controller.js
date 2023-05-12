import { emailValidator } from "../../utils/validator.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import { issueJWT } from "../../utils/token.js";
import {
  createUser,
  userSignIn,
  getCompanyByUser,
  getRoleByUserCompany,
} from "../models/user_model.js";
import { createCompany } from "../models/company_model.js";

const createNewUser = async function (req, res) {
  let provider = "";
  const { name, email, password, terms } = req.body;
  if (terms !== "agree") {
    res.status(400).json("Please agree terms");
    return;
  }

  let emailValidate = await emailValidator(email);
  if (emailValidate == false) {
    res.status(400).json("Email format invalid");
    return;
  }
  if (!password) {
    res.status(400).json("Lack of password");
    return;
  }
  if (!name) {
    res.status(400).json("Lack of name");
    return;
  }
  const hashedPassword = await hashPassword(password);
  if (provider == "") {
    let newUser;
    provider = "native";
    try {
      newUser = await createUser(provider, name, email, hashedPassword);
    } catch (err) {
      if ((err.errno = 1062)) {
        res.status(403).json("Email already exist");
        return;
      }
    }
    if (newUser) {
      const userId = newUser.insertId;
      const createDefaultCompany = await createCompany(userId, "My Urls");
      const access_token = await issueJWT(userId, provider);
      res.status(200).json({ data: { access_token, access_expired: 3600 } });
      return;
    }
  }
};

const checkIsUser = async function (req, res) {
  const { email, password, remember } = req.body;
  const user = await userSignIn(email);
  if (!user) {
    res.status(400).json("Email not registered");
    return;
  }
  const hashedPassword = user.password;
  const verify = await verifyPassword(hashedPassword, password);
  if (verify) {
    const userId = user.id;
    const provider = user.provider;
    const access_token = await issueJWT(userId, provider, remember);
    let access_expired = process.env.JWT_SHORT_EXPIRE;
    if (remember == "on") {
      access_expired = process.env.JWT_LONG_EXPIRE;
    }
    res
      .status(200)
      .json({ data: { access_token, access_expired: access_expired } });
    return;
  } else {
    res.status(403).json("Password incorrect");
    return;
  }
};

const getUserCompany = async (req, res) => {
  const user_id = res.locals.decoded.userId;
  const user_company = await getCompanyByUser(user_id);
  return res.status(200).json(user_company);
};

const getUserRole = async (req, res) => {
  const user_id = res.locals.decoded.userId;
  const company_id = 1;
  const user_role = await getRoleByUserCompany(user_id, company_id);
  console.log(user_role);
  return res.status(200).json(user_role);
};

export { createNewUser, checkIsUser, getUserCompany, getUserRole };
