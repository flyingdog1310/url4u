import express from "express";
const router = express.Router();
import { wrapAsync } from "../middlewares/error_handler.js";
import {
  getUserCompany,
  createNewUser,
  checkUser,
} from "../controllers/api_user_controller.js";
import { verifyJWT } from "../middlewares/token.js";

router.route("/user").get(verifyJWT, wrapAsync(getUserCompany));
router.route("/user").post(wrapAsync(checkUser));
router.route("/user/register").post(wrapAsync(createNewUser));

export default router;
