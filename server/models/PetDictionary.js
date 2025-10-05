import mongoose from "mongoose";

const petDictionarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  species: {
    type: String,
    required: true,
    enum: ['dog', 'cat', 'bird', 'fish', 'rabbit', 'hamster', 'guinea-pig', 'turtle', 'snake', 'lizard', 'other'],
    required: true
  },
  breed: {
    type: String,
    required: true,
    trim: true
  },
  origin: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: String,
    required: true,
    enum: ['tiny', 'small', 'medium', 'large', 'giant']
  },
  weight: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    unit: { type: String, default: 'kg' }
  },
  height: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    unit: { type: String, default: 'cm' }
  },
  lifespan: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    unit: { type: String, default: 'years' }
  },
  temperament: [{
    type: String,
    trim: true
  }],
  characteristics: {
    energy: {
      type: String,
      enum: ['low', 'moderate', 'high', 'very-high'],
      required: true
    },
    intelligence: {
      type: String,
      enum: ['low', 'moderate', 'high', 'very-high'],
      required: true
    },
    trainability: {
      type: String,
      enum: ['difficult', 'moderate', 'easy', 'very-easy'],
      required: true
    },
    social: {
      type: String,
      enum: ['independent', 'moderate', 'social', 'very-social'],
      required: true
    },
    grooming: {
      type: String,
      enum: ['minimal', 'moderate', 'high', 'very-high'],
      required: true
    },
    shedding: {
      type: String,
      enum: ['none', 'minimal', 'moderate', 'heavy'],
      required: true
    },
    barking: {
      type: String,
      enum: ['quiet', 'moderate', 'vocal', 'very-vocal'],
      required: true
    }
  },
  care: {
    exercise: {
      type: String,
      required: true,
      trim: true
    },
    diet: {
      type: String,
      required: true,
      trim: true
    },
    grooming: {
      type: String,
      required: true,
      trim: true
    },
    health: {
      type: String,
      required: true,
      trim: true
    },
    training: {
      type: String,
      required: true,
      trim: true
    }
  },
  images: [{
    url: { type: String, required: true },
    caption: { type: String },
    isPrimary: { type: Boolean, default: false }
  }],
  description: {
    type: String,
    required: true,
    trim: true
  },
  history: {
    type: String,
    trim: true
  },
  funFacts: [{
    type: String,
    trim: true
  }],
  commonHealthIssues: [{
    issue: { type: String, required: true },
    description: { type: String },
    prevention: { type: String }
  }],
  suitability: {
    families: {
      type: String,
      enum: ['not-suitable', 'suitable', 'excellent'],
      required: true
    },
    children: {
      type: String,
      enum: ['not-suitable', 'suitable', 'excellent'],
      required: true
    },
    seniors: {
      type: String,
      enum: ['not-suitable', 'suitable', 'excellent'],
      required: true
    },
    apartments: {
      type: String,
      enum: ['not-suitable', 'suitable', 'excellent'],
      required: true
    },
    firstTimeOwners: {
      type: String,
      enum: ['not-suitable', 'suitable', 'excellent'],
      required: true
    }
  },
  priceRange: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    currency: { type: String, default: 'INR' }
  },
  availability: {
    type: String,
    enum: ['common', 'uncommon', 'rare', 'very-rare'],
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  isIndianBreed: {
    type: Boolean,
    default: false
  },
  isPopular: {
    type: Boolean,
    default: false
  },
  isRare: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

// Indexes for better performance
petDictionarySchema.index({ species: 1, breed: 1 });
petDictionarySchema.index({ origin: 1 });
petDictionarySchema.index({ isIndianBreed: 1 });
petDictionarySchema.index({ isPopular: 1 });
petDictionarySchema.index({ tags: 1 });
petDictionarySchema.index({ 'characteristics.energy': 1 });
petDictionarySchema.index({ 'characteristics.intelligence': 1 });

const PetDictionary = mongoose.model("PetDictionary", petDictionarySchema);
export default PetDictionary;
