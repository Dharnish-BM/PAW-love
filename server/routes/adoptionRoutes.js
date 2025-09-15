import express from "express";
import {
    expressInterest,
    getApplicationsForShelter,
    getMyApplications,
    submitApplication,
    updateApplicationStatus
} from "../controllers/adoptionController.js";
import { protect, shelterOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit adoption application (pet seeker)
router.post("/apply", protect, submitApplication);

// Get user's applications (pet seeker)
router.get("/my-applications", protect, getMyApplications);

// Express interest (pet seeker) - legacy endpoint
router.post("/:petId", protect, expressInterest);

// Shelter dashboard routes
router.get("/mypets", protect, shelterOnly, getApplicationsForShelter);
router.put("/:id", protect, shelterOnly, updateApplicationStatus);

export default router;
