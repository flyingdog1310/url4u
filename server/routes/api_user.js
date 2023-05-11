import express from "express";
const router = express.Router();
import { wrapAsync } from "../middlewares/error_handler.js";
import { verifyJWT } from "../middlewares/token.js";
import {
  getUserCompany,
  createNewUser,
  checkIsUser,
} from "../controllers/api_user_controller.js";

router.route("/user").get(verifyJWT, wrapAsync(getUserCompany));
router.route("/user").post(wrapAsync(checkIsUser));
router.route("/user/register").post(wrapAsync(createNewUser));

export default router;
