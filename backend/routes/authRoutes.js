import express from "express";
import { login, logout, me, signup } from "../controllers/authControllers.js";
const router = express.Router();

router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/logout").post(logout);
router.route("/me").get(me);

export default router;