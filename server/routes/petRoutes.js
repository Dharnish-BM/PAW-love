import express from "express";
import {
  addPet,
  getPetById,
  getPets,
  markAdopted,
  updatePet
} from "../controllers/petController.js";
import { protect, shelterOnly } from "../middleware/authMiddleware.js";
import Pet from "../models/Pet.js";

const router = express.Router();

/* -------------------------------------------
   PUBLIC ROUTES (accessible to everyone)
-------------------------------------------- */

// Get all pets
router.get("/", getPets);

// ⚠️ IMPORTANT: static routes must come BEFORE dynamic /:id
// Dashboard: pets posted by current shelter user
router.get("/mine/list", protect, shelterOnly, async (req, res) => {
  try {
    const pets = await Pet.find({ postedBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pets" });
  }
});

// Dashboard: applications received by shelter (placeholder)
router.get("/owner/applications/list", protect, shelterOnly, async (req, res) => {
  try {
    res.json([]); // implement later
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications" });
  }
});

// Get pet by ID (must be AFTER static routes)
router.get("/:id", getPetById);


/* -------------------------------------------
   PROTECTED ROUTES (only shelters)
-------------------------------------------- */

// Add new pet
router.post("/add", protect, shelterOnly, addPet);

// Update pet
router.put("/:id", protect, shelterOnly, updatePet);

// Mark as adopted
router.put("/:id/adopt", protect, shelterOnly, markAdopted);

// Delete pet
router.delete("/:id", protect, shelterOnly, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Ensure user owns the pet listing
    if (pet.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this pet" });
    }

    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
