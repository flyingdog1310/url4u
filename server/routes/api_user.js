import express from "express";
const router = express.Router();
import { getUserCompany } from "../controllers/api_company_controller.js";
import { wrapAsync } from "../../util/util.js";

router.route("/user/*").get(wrapAsync(getUserCompany));
export default router;
