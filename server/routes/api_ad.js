import express from "express";
const router = express.Router();

import {
  getUrlClicks,
  getUrlClickByDevice,
  getUrlClickByRegion,
  getUrlClickByReferrer
} from "../controllers/api_ad_controller.js";
import { wrapAsync } from "../../util/util.js";

router.route("/total_click/*").get(wrapAsync(getUrlClicks));
router.route("/device_click/*").get(wrapAsync(getUrlClickByDevice));
router.route("/region_click/*").get(wrapAsync(getUrlClickByRegion));
router.route("/referrer_click/*").get(wrapAsync(getUrlClickByReferrer));

export default router;
