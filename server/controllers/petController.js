import asyncHandler from "express-async-handler";
import Pet from "../models/Pet.js";

// @desc    Get all available pets
// @route   GET /api/pets
// @access  Public
export const getPets = asyncHandler(async (req, res) => {
  const pets = await Pet.find({ isAdopted: false });
  console.log('Returning pets:', pets.map(p => ({ 
    id: p._id, 
    name: p.name, 
    images: p.images,
    imagesLength: p.images?.length,
    firstImage: p.images?.[0]?.substring(0, 50) + '...'
  })));
  res.json(pets);
});

// @desc    Get single pet by ID
// @route   GET /api/pets/:id
// @access  Public
export const getPetById = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id).populate('postedBy', 'name email');
  
  if (!pet) {
    res.status(404);
    throw new Error("Pet not found");
  }
  
  res.json(pet);
});

// @desc    Add a new pet
// @route   POST /api/pets/add
// @access  Shelter only
export const addPet = asyncHandler(async (req, res) => {
  console.log('Received pet data:', req.body);
  console.log('Images field:', req.body.images);
  console.log('Images type:', typeof req.body.images);
  console.log('Images length:', req.body.images?.length);
  
  const pet = await Pet.create({
    ...req.body,
    postedBy: req.user._id,
  });
  console.log('Created pet:', pet);
  console.log('Created pet images:', pet.images);
  res.status(201).json(pet);
});

// @desc    Update a pet
// @route   PUT /api/pets/:id
// @access  Shelter only
export const updatePet = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (!pet) {
    res.status(404);
    throw new Error("Pet not found");
  }

  // Only the user who posted can edit
  if (pet.postedBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this pet");
  }

  const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedPet);
});

// @desc    Mark a pet as adopted
// @route   PUT /api/pets/:id/adopt
// @access  Shelter only
export const markAdopted = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id);
  if (!pet) {
    res.status(404);
    throw new Error("Pet not found");
  }

  if (pet.postedBy.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to update this pet");
  }

  pet.isAdopted = true;
  await pet.save();

  res.json({ message: `${pet.name} is marked as adopted!` });
});
