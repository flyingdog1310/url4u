import express from "express";
const router = express.Router();

import { visitUrl } from "../controllers/root_controller.js";
import { wrapAsync } from "../../util/util.js";

router.route("/").get(
  wrapAsync(async (req, res) => {
    res.render("index");
  })
);
router.route("/modify_url").get(
  wrapAsync(async (req, res) => {
    res.render("modify");
  })
);

router.route("/*").get(wrapAsync(visitUrl));

export default router;
