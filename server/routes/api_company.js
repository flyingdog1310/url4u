import express from "express";
const router = express.Router();

import {
  createUserCompany,
  getShortUrlListByCompany,
  getShortUrlListByUrl,
  getCompanyUser,
} from "../controllers/api_company_controller.js";
import { verifyJWT } from "../../util/token.js";
import { wrapAsync } from "../../util/util.js";

router.route("/company").post(verifyJWT,wrapAsync(createUserCompany));
router.route("/company/*/user").get(wrapAsync(getCompanyUser));
router.route("/company/url/*").get(wrapAsync(getShortUrlListByUrl));
router.route("/company/*").get(wrapAsync(getShortUrlListByCompany));


export default router;
