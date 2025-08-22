import express from "express";
import { addPet, getPets, markAdopted, updatePet } from "../controllers/petController.js";
import { protect, shelterOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route: anyone can browse pets
router.get("/", getPets);

// Protected routes: only logged-in shelters can manage pets
router.post("/add", protect, shelterOnly, addPet);
router.put("/:id", protect, shelterOnly, updatePet);
router.put("/:id/adopt", protect, shelterOnly, markAdopted);

export default router;
