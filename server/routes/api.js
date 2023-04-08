import express from "express";
const router = express.Router();

import {
  createShortUrl,
  updateShortUrl,
} from "../controllers/api_controller.js";
import { wrapAsync } from "../../util/util.js";

router.route("/url").post(wrapAsync(createShortUrl));
router.route("/modify_url").post(wrapAsync(updateShortUrl));

export default router;
