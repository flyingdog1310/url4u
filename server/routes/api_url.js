import express from "express";
const router = express.Router();
import { upload } from "../services/multer.js";

import {
  createShortUrl,
  updateShortUrl,
  getShortUrl,
  getCrawImgs,
} from "../controllers/api_url_controller.js";
import { wrapAsync } from "../middlewares/error_handler.js";

router.route("/url").post(wrapAsync(createShortUrl));
router.route("/url/crawl/:url_id").get(wrapAsync(getCrawImgs));
router.route("/url/:url_id").get(wrapAsync(getShortUrl));
router
  .route("/url/:url_id")
  .post(upload.single("picture"), wrapAsync(updateShortUrl));

export default router;
