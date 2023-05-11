import express from "express";
const router = express.Router();

import {
  createUserCompany,
  createCompanyUser,
  getShortUrlListByCompany,
  getShortUrlListByUrl,
  getCompanyUser,
} from "../controllers/api_company_controller.js";
import { verifyJWT } from "../middlewares/token.js";
import { wrapAsync } from "../middlewares/error_handler.js";

router.route("/company").post(verifyJWT,wrapAsync(createUserCompany));
router.route("/company/:company_id/user").post(verifyJWT,wrapAsync(createCompanyUser));
router.route("/company/:company_id/user").get(wrapAsync(getCompanyUser));
router.route("/company/url/:url_id").get(wrapAsync(getShortUrlListByUrl));
router.route("/company/:company_id").get(wrapAsync(getShortUrlListByCompany));


export default router;
