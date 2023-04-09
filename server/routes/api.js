import express from "express";
const router = express.Router();
import { upload } from "../../util/multer.js";

import {
  createShortUrl,
  updateShortUrl,
} from "../controllers/api_controller.js";
import { wrapAsync } from "../../util/util.js";


router.route("/url").post(wrapAsync(createShortUrl));
router.route("/modify_url").post( upload.single('picture'),wrapAsync(updateShortUrl));

export default router;
