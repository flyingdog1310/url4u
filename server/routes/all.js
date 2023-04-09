import express from "express";
const router = express.Router();
import { wrapAsync } from "../../util/util.js";
import { visitUrl } from "../controllers/root_controller.js";

router.route("/*").get(wrapAsync(visitUrl));

export default router;
