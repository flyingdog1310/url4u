import express from "express";
const router = express.Router();
import { upload } from "../../util/multer.js";

import {
  createShortUrl,
  updateShortUrl,
  getShortUrlList,
  getShortUrl,
} from "../controllers/api_controller.js";
import { wrapAsync } from "../../util/util.js";

router.route("/urls").get(wrapAsync(getShortUrlList));
router.route("/url/*").get(wrapAsync(getShortUrl));
router.route("/url").post(wrapAsync(createShortUrl));

router.route("/url").post(upload.single("picture"), wrapAsync(updateShortUrl));

export default router;
