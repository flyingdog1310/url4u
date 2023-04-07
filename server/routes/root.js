import express from "express";
const router = express.Router();

import { visitUrl } from "../controllers/root_controller.js";
import { wrapAsync } from "../../util/util.js";

router.route("/").get(
  wrapAsync(async (req, res) => {
    res.json("hello");
  })
);
router.route("/url").get(wrapAsync(visitUrl));

export default router;
