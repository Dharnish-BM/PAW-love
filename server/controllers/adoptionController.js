import asyncHandler from "express-async-handler";
import AdoptionApplication from "../models/AdoptionApplication.js";
import Pet from "../models/Pet.js";

// Express interest in a pet
// POST /api/adoptions/:petId
// Access: logged-in users (non-shelters)
export const expressInterest = asyncHandler(async (req, res) => {
  const { petId } = req.params;

  // Check if pet exists
  const pet = await Pet.findById(petId);
  if (!pet) {
    res.status(404);
    throw new Error("Pet not found");
  }

  // Create adoption application
  const application = await AdoptionApplication.create({
    pet: pet._id,
    user: req.user._id,
  });

  res.status(201).json(application);
});

// Get all applications for a shelter's pets
// GET /api/adoptions/mypets
// Access: shelter only
export const getApplicationsForShelter = asyncHandler(async (req, res) => {
  const pets = await Pet.find({ postedBy: req.user._id });
  const petIds = pets.map(p => p._id);

  const applications = await AdoptionApplication.find({ pet: { $in: petIds } })
    .populate("pet")
    .populate("user");

  res.json(applications);
});

// Update application status
// PUT /api/adoptions/:id
// Access: shelter only
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const app = await AdoptionApplication.findById(id).populate("pet");
  if (!app) {
    res.status(404);
    throw new Error("Application not found");
  }

  // Ensure shelter owns the pet
  if (app.pet.postedBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized");
  }

  app.status = status;
  await app.save();

  res.json(app);
});
