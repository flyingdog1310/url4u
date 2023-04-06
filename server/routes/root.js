import express from "express";
const router = express.Router();

import { redirectUrl ,previewUrl} from "../controllers/root_controller.js";
import { wrapAsync } from "../../util/util.js";

router.route("/url").get(wrapAsync(redirectUrl));
router.route("/url1").get(wrapAsync(previewUrl));

export default router;
