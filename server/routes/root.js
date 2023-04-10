import express from "express";
const router = express.Router();
import { wrapAsync } from "../../util/util.js";

router.route("/").get(
  wrapAsync(async (req, res) => {
    res.render("index");
  })
);

router.route("/list").get(
  wrapAsync(async (req, res) => {
    res.render("list");
  })
);

router.route("/url/*").get(
  wrapAsync(async (req, res) => {
    res.render("modify");
  })
);

router.route("/dashboard/*").get(
  wrapAsync(async (req, res) => {
    res.render("dashboard");
  })
);

export default router;
