import express from "express";
const router = express.Router();
import { wrapAsync } from "../../util/util.js";
import { visitUrl ,loadTestUrl} from "../controllers/root_controller.js";

router.route("/test/*").get(wrapAsync(loadTestUrl));
router.route("/*").get(wrapAsync(visitUrl));

export default router;
