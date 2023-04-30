import express from "express";
const router = express.Router();

import {
  getUrlClicks,
  getUrlClickByDevice,
  getUrlClickByRegion,
  getUrlClickByReferrer,
  getUrlClickByTime,
  getUrlClickByWeek,
  getTopUrlClick,
} from "../controllers/api_ad_controller.js";
import { wrapAsync } from "../../util/util.js";

router.route("/total_click/*").get(wrapAsync(getUrlClicks));
router.route("/device_click/*").get(wrapAsync(getUrlClickByDevice));
router.route("/region_click/*").get(wrapAsync(getUrlClickByRegion));
router.route("/referrer_click/*").get(wrapAsync(getUrlClickByReferrer));
router.route("/time_click/*").post(wrapAsync(getUrlClickByTime));
router.route("/week_click/*").get(wrapAsync(getUrlClickByWeek));
router.route("/top_click/*").get(wrapAsync(getTopUrlClick));

export default router;
