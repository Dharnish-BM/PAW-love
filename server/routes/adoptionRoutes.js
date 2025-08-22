import express from "express";
import { expressInterest, getApplicationsForShelter, updateApplicationStatus } from "../controllers/adoptionController.js";
import { protect, shelterOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Express interest (pet seeker)
router.post("/:petId", protect, expressInterest);

// Shelter dashboard routes
router.get("/mypets", protect, shelterOnly, getApplicationsForShelter);
router.put("/:id", protect, shelterOnly, updateApplicationStatus);

export default router;
