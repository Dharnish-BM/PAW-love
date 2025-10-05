import express from "express";
import {
    getFeaturedPets,
    getPet,
    getPets,
    getStats,
    searchPets,
    seedDictionary
} from "../controllers/petDictionaryController.js";

const router = express.Router();

// Public routes
router.get("/pets", getPets);
router.get("/pets/:id", getPet);
router.get("/stats", getStats);
router.get("/featured", getFeaturedPets);
router.get("/search", searchPets);

// Admin routes
router.post("/seed", seedDictionary);

export default router;
