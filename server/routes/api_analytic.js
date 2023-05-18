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
import { verifyJWT } from "../middlewares/token.js";

router.route("/total_click/:id").get(verifyJWT, wrapAsync(getUrlClicks));
router.route("/device_click/:id").get(verifyJWT, wrapAsync(getUrlClickByDevice));
router.route("/region_click/:id").get(verifyJWT, wrapAsync(getUrlClickByRegion));
router.route("/referrer_click/:id").get(verifyJWT, wrapAsync(getUrlClickByReferrer));
router.route("/time_click/:id").post(verifyJWT, wrapAsync(getUrlClickByTime));
router.route("/week_click/:id").get(verifyJWT, wrapAsync(getUrlClickByWeek));
router.route("/top_click/:id").get(verifyJWT, wrapAsync(getTopUrlClick));

export default router;
