import express from "express";
import { getMe, getShelters, googleAuth, login, logout, signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", googleAuth);
router.post("/logout", logout);
router.get("/me", getMe);
router.get("/shelters", getShelters);

export default router;
