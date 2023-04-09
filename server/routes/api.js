import express from "express";
const router = express.Router();
import { upload } from "../../util/multer.js";

import {
  createShortUrl,
  updateShortUrl,
  getShortUrlList
} from "../controllers/api_controller.js";
import { wrapAsync } from "../../util/util.js";


router.route("/url").post(wrapAsync(createShortUrl));
router.route("/urls").post(wrapAsync(getShortUrlList));
router.route("/modify_url").post( upload.single('picture'),wrapAsync(updateShortUrl));

export default router;
