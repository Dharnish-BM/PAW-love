import asyncHandler from "express-async-handler";
import PetDictionary from "../models/PetDictionary.js";
import seedPetDictionary from "../utils/seedPetDictionary.js";

// @desc    Get all pet dictionary entries
// @route   GET /api/dictionary/pets
// @access  Public
export const getPets = asyncHandler(async (req, res) => {
  const { 
    species, 
    search, 
    origin, 
    size, 
    energy,
    intelligence,
    isIndianBreed,
    isPopular,
    tags,
    sortBy = 'name', 
    sortOrder = 'asc',
    page = 1,
    limit = 20
  } = req.query;

  const filter = {};
  
  // Species filter
  if (species && species !== 'all') {
    filter.species = species;
  }
  
  // Search filter
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { breed: { $regex: search, $options: 'i' } },
      { origin: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }
  
  // Origin filter
  if (origin && origin !== 'all') {
    filter.origin = { $regex: origin, $options: 'i' };
  }
  
  // Size filter
  if (size && size !== 'all') {
    filter.size = size;
  }
  
  // Energy level filter
  if (energy && energy !== 'all') {
    filter['characteristics.energy'] = energy;
  }
  
  // Intelligence filter
  if (intelligence && intelligence !== 'all') {
    filter['characteristics.intelligence'] = intelligence;
  }
  
  // Indian breed filter
  if (isIndianBreed === 'true') {
    filter.isIndianBreed = true;
  }
  
  // Popular filter
  if (isPopular === 'true') {
    filter.isPopular = true;
  }
  
  // Tags filter
  if (tags) {
    const tagArray = tags.split(',').map(tag => tag.trim().toLowerCase());
    filter.tags = { $in: tagArray };
  }

  // Build sort object
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const pets = await PetDictionary.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit));

  const totalPets = await PetDictionary.countDocuments(filter);

  res.json({
    pets,
    pagination: {
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalPets / parseInt(limit)),
      totalPets,
      hasNext: skip + pets.length < totalPets,
      hasPrev: parseInt(page) > 1
    }
  });
});

// @desc    Get single pet dictionary entry
// @route   GET /api/dictionary/pets/:id
// @access  Public
export const getPet = asyncHandler(async (req, res) => {
  const pet = await PetDictionary.findById(req.params.id);

  if (!pet) {
    res.status(404);
    throw new Error("Pet not found in dictionary");
  }

  res.json(pet);
});

// @desc    Get pet dictionary statistics
// @route   GET /api/dictionary/stats
// @access  Public
export const getStats = asyncHandler(async (req, res) => {
  const stats = await PetDictionary.aggregate([
    {
      $group: {
        _id: null,
        totalPets: { $sum: 1 },
        indianBreeds: { $sum: { $cond: ['$isIndianBreed', 1, 0] } },
        popularBreeds: { $sum: { $cond: ['$isPopular', 1, 0] } },
        rareBreeds: { $sum: { $cond: ['$isRare', 1, 0] } }
      }
    }
  ]);

  const speciesStats = await PetDictionary.aggregate([
    {
      $group: {
        _id: '$species',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);

  const originStats = await PetDictionary.aggregate([
    {
      $group: {
        _id: '$origin',
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);

  res.json({
    overview: stats[0] || { totalPets: 0, indianBreeds: 0, popularBreeds: 0, rareBreeds: 0 },
    species: speciesStats,
    origins: originStats
  });
});

// @desc    Get featured pets (popular, Indian breeds, etc.)
// @route   GET /api/dictionary/featured
// @access  Public
export const getFeaturedPets = asyncHandler(async (req, res) => {
  const { type = 'popular', limit = 6 } = req.query;
  
  let filter = {};
  
  switch (type) {
    case 'indian':
      filter.isIndianBreed = true;
      break;
    case 'popular':
      filter.isPopular = true;
      break;
    case 'rare':
      filter.isRare = true;
      break;
    default:
      filter.isPopular = true;
  }

  const pets = await PetDictionary.find(filter)
    .sort({ name: 1 })
    .limit(parseInt(limit));

  res.json(pets);
});

// @desc    Search pets by name or breed
// @route   GET /api/dictionary/search
// @access  Public
export const searchPets = asyncHandler(async (req, res) => {
  const { q, limit = 10 } = req.query;
  
  if (!q || q.length < 2) {
    res.status(400);
    throw new Error("Search query must be at least 2 characters long");
  }

  const pets = await PetDictionary.find({
    $or: [
      { name: { $regex: q, $options: 'i' } },
      { breed: { $regex: q, $options: 'i' } },
      { origin: { $regex: q, $options: 'i' } }
    ]
  })
  .select('name breed species origin images')
  .limit(parseInt(limit));

  res.json(pets);
});

// @desc    Seed pet dictionary data
// @route   POST /api/dictionary/seed
// @access  Private (Admin only)
export const seedDictionary = asyncHandler(async (req, res) => {
  try {
    await seedPetDictionary();
    res.json({ message: "Pet dictionary seeded successfully" });
  } catch (error) {
    res.status(500);
    throw new Error("Failed to seed pet dictionary");
  }
});