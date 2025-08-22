import express from "express";
import { addPet, getPets, markAdopted, updatePet } from "../controllers/petController.js";
import { protect, shelterOnly } from "../middleware/authMiddleware.js";
import Pet from "../models/Pet.js";

const router = express.Router();

// Public route: anyone can browse pets
router.get("/", getPets);

// Protected routes: only logged-in shelters can manage pets
router.post("/add", protect, shelterOnly, addPet);
router.put("/:id", protect, shelterOnly, updatePet);
router.put("/:id/adopt", protect, shelterOnly, markAdopted);
router.delete("/:id", protect, shelterOnly, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      res.status(404);
      throw new Error("Pet not found");
    }

    // Only the user who posted can delete
    if (pet.postedBy.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to delete this pet");
    }

    await Pet.findByIdAndDelete(req.params.id);
    res.json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Dashboard routes
router.get("/mine/list", protect, shelterOnly, async (req, res) => {
  try {
    const pets = await Pet.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching pets" });
  }
});

router.get("/owner/applications/list", protect, shelterOnly, async (req, res) => {
  try {
    // This would need to be implemented based on your application model
    // For now, returning empty array
    res.json([]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications" });
  }
});

export default router;
