import { emailValidator } from "../../utils/validator.js";
import { hashPassword, verifyPassword } from "../../utils/password.js";
import { issueJWT, verifyJWT } from "../middlewares/token.js";
import {
  createUser,
  userSignIn,
  getCompanyByUser,
} from "../models/user_model.js";
import { createCompany } from "../models/company_model.js";

const createNewUser = async function (req, res) {
  let provider = "";
  const { name, email, password, terms } = req.body;
  if (terms !== "agree") {
    res.status(400).json("please agree terms");
    return;
  }
  let emailValidate = await emailValidator(email);

  //TODO:
  if (!emailValidate) {
    res.status(400).json("email format is wrong");
    return;
  }
  if (!password) {
    res.status(400).json("lack of password");
    return;
  }
  if (!name) {
    res.status(400).json("lack of name");
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
        res.status(403).json("email already exist");
        return;
      }
    }
    if (newUser) {
      const userId = newUser.insertId;
      const createDefaultCompany = await createCompany(userId, "My Urls");
      const access_token = await issueJWT(userId, provider);
      console.log({ data: { access_token, access_expired: 3600 } });
      res.status(200).json({ data: { access_token, access_expired: 3600 } });
      return;
    }
  }
};

const checkUser = async function (req, res) {
  const { email, password, remember } = req.body;
  const lookup = await userSignIn(email);
  if (!lookup[0]) {
    res.status(400).json("Email is not registered");
    return;
  }
  const hashedPassword = lookup[0].password;
  console.log(lookup);
  const verify = await verifyPassword(hashedPassword, password);
  if (verify) {
    const userId = lookup[0].id;
    const provider = lookup[0].provider;
    const access_token = await issueJWT(userId, provider, remember);
    let access_expired = process.env.JWT_SHORT_EXPIRE;
    if (remember == "on") {
      access_expired = process.env.JWT_LONG_EXPIRE;
    }
    console.log({ data: { access_token, access_expired: access_expired } });
    res
      .status(200)
      .json({ data: { access_token, access_expired: access_expired } });
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
