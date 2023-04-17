import express from "express";
const router = express.Router();

import {
  createUserCompany,
  getShortUrlList,
  getCompanyUser,
} from "../controllers/api_company_controller.js";
import { verifyJWT } from "../../util/token.js";
import { wrapAsync } from "../../util/util.js";

router.route("/company").post(verifyJWT,wrapAsync(createUserCompany));
router.route("/company/*/user").get(wrapAsync(getCompanyUser));
router.route("/company/*").get(wrapAsync(getShortUrlList));

export default router;
