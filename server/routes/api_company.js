import express from "express";
const router = express.Router();

import {
  createUserCompany,
  getUserCompany,
  getShortUrlList,
} from "../controllers/api_company_controller.js";
import { wrapAsync } from "../../util/util.js";

router.route("/company").post(wrapAsync(createUserCompany));
router.route("/company/*").get(wrapAsync(getShortUrlList));

export default router;
