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
import { wrapAsync } from "../middlewares/error_handler.js";

router.route("/total_click/:id").get(wrapAsync(getUrlClicks));
router.route("/device_click/:id").get(wrapAsync(getUrlClickByDevice));
router.route("/region_click/:id").get(wrapAsync(getUrlClickByRegion));
router.route("/referrer_click/:id").get(wrapAsync(getUrlClickByReferrer));
router.route("/time_click/:id").post(wrapAsync(getUrlClickByTime));
router.route("/week_click/:id").get(wrapAsync(getUrlClickByWeek));
router.route("/top_click/:id").get(wrapAsync(getTopUrlClick));

export default router;
