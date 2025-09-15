import express from "express";
import { login, logout, signup, getMe, googleAuth } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleAuth);
router.post("/logout", logout);
router.get("/me", getMe);

export default router;
