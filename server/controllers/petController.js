import asyncHandler from "express-async-handler";
import Pet from "../models/Pet.js";

// @desc    Get all available pets
// @route   GET /api/pets
// @access  Public
export const getPets = asyncHandler(async (req, res) => {
  const { q, species, gender, size, minPrice, maxPrice, listingType, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
  
  // Build filter object
  const filter = { isAdopted: false };
  
  // Text search
  if (q) {
    filter.$or = [
      { name: { $regex: q, $options: 'i' } },
      { breed: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } }
    ];
  }
  
  // Species filter
  if (species) {
    filter.species = species;
  }
  
  // Gender filter
  if (gender) {
    filter.gender = gender;
  }
  
  // Size filter
  if (size) {
    filter.size = size;
  }
  
  // Listing type filter
  if (listingType) {
    filter.listingType = listingType;
  }
  
  // Price range filter (only for sale listings)
  if (minPrice || maxPrice) {
    filter.listingType = 'sale'; // Only apply price filters to sale listings
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }
  
  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
  const pets = await Pet.find(filter).sort(sort);
  
  console.log('Returning pets:', pets.map(p => ({ 
    id: p._id, 
    name: p.name, 
    listingType: p.listingType,
    price: p.price,
    isNegotiable: p.isNegotiable,
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
  console.log('Listing type:', req.body.listingType);
  console.log('Price field:', req.body.price);
  console.log('IsNegotiable field:', req.body.isNegotiable);
  
  // Validate listing type
  if (!req.body.listingType || !['adoption', 'sale'].includes(req.body.listingType)) {
    res.status(400);
    throw new Error("Listing type must be either 'adoption' or 'sale'");
  }
  
  // Validate pricing fields for sale listings
  if (req.body.listingType === 'sale') {
    if (!req.body.price || req.body.price < 0) {
      res.status(400);
      throw new Error("Price is required for sale listings and must be a positive number");
    }
  }
  
  const petData = {
    ...req.body,
    postedBy: req.user._id,
  };
  
  // Only add pricing fields for sale listings
  if (req.body.listingType === 'sale') {
    petData.price = parseFloat(req.body.price);
    petData.isNegotiable = req.body.isNegotiable !== undefined ? req.body.isNegotiable : true;
    petData.currency = req.body.currency || 'USD';
  }
  
  const pet = await Pet.create(petData);
  console.log('Created pet:', pet);
  console.log('Created pet images:', pet.images);
  console.log('Created pet listing type:', pet.listingType);
  if (pet.listingType === 'sale') {
    console.log('Created pet price:', pet.price, 'Negotiable:', pet.isNegotiable);
  }
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

  // Validate listing type if provided
  if (req.body.listingType && !['adoption', 'sale'].includes(req.body.listingType)) {
    res.status(400);
    throw new Error("Listing type must be either 'adoption' or 'sale'");
  }
  
  // Validate price if provided for sale listings
  if (req.body.listingType === 'sale' || (req.body.price !== undefined && req.body.listingType !== 'adoption')) {
    if (req.body.price !== undefined && req.body.price < 0) {
      res.status(400);
      throw new Error("Price must be a positive number");
    }
    if (req.body.price !== undefined) {
      req.body.price = parseFloat(req.body.price);
    }
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
