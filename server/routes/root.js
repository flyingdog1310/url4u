import express from "express";
const router = express.Router();
import { wrapAsync } from "../middlewares/error_handler.js";

router.route("/").get(
  wrapAsync(async (req, res) => {
    res.render("index");
  })
);

router.route("/user").get(
  wrapAsync(async (req, res) => {
    res.render("user");
  })
);

router.route("/user/register").get(
  wrapAsync(async (req, res) => {
    res.render("user_register");
  })
);

router.route("/user/company").get(
  wrapAsync(async (req, res) => {
    res.render("user_company");
  })
);

router.route("/company/:company_id/user").get(
  wrapAsync(async (req, res) => {
    res.render("company_user");
  })
);

router.route("/company/:company_id").get(
  wrapAsync(async (req, res) => {
    res.render("company_url");
  })
);

router.route("/url/modify/:url_id").get(
  wrapAsync(async (req, res) => {
    res.render("url_modify");
  })
);

router.route("/url/analytic/:url_id").get(
  wrapAsync(async (req, res) => {
    res.render("url_analytic");
  })
);

export default router;
