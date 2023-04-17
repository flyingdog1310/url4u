import express from "express";
const router = express.Router();
import { wrapAsync } from "../../util/util.js";
import {
  getUserCompany,
  createNewUser,
  checkUser,
} from "../controllers/api_user_controller.js";
import { verifyJWT } from "../../util/token.js";

router.route("/user").get(verifyJWT, wrapAsync(getUserCompany));
router.route("/user").post(wrapAsync(checkUser));
router.route("/user/register").post(wrapAsync(createNewUser));

export default router;
