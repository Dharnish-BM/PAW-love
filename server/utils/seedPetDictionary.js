import connectDB from '../config/db.js';
import PetDictionary from '../models/PetDictionary.js';

const petData = [
  // Indian Dog Breeds
  {
    name: "Rajapalayam",
    species: "dog",
    breed: "Rajapalayam",
    origin: "India (Tamil Nadu)",
    size: "large",
    weight: { min: 25, max: 35, unit: "kg" },
    height: { min: 65, max: 75, unit: "cm" },
    lifespan: { min: 10, max: 14, unit: "years" },
    temperament: ["loyal", "protective", "intelligent", "independent"],
    characteristics: {
      energy: "high",
      intelligence: "high",
      trainability: "moderate",
      social: "moderate",
      grooming: "moderate",
      shedding: "moderate",
      barking: "moderate"
    },
    care: {
      exercise: "Requires daily vigorous exercise and mental stimulation",
      diet: "High-quality protein diet, 2-3 meals per day",
      grooming: "Weekly brushing, regular nail trimming",
      health: "Generally healthy, watch for hip dysplasia",
      training: "Early socialization and consistent training recommended"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500", isPrimary: true }
    ],
    description: "The Rajapalayam is a large, elegant sighthound from Tamil Nadu, known for its white coat and hunting abilities. Originally bred for hunting wild boar and guarding.",
    history: "Named after the town of Rajapalayam in Tamil Nadu, this breed has been used by Indian royalty for hunting and protection for centuries.",
    funFacts: [
      "Known as the 'Indian Greyhound'",
      "Excellent at hunting wild boar",
      "Very loyal to their family",
      "Can run at speeds up to 40 km/h"
    ],
    commonHealthIssues: [
      { issue: "Hip Dysplasia", description: "Joint condition affecting hip joints", prevention: "Regular exercise, proper nutrition, avoid overfeeding" }
    ],
    suitability: {
      families: "suitable",
      children: "suitable",
      seniors: "not-suitable",
      apartments: "not-suitable",
      firstTimeOwners: "not-suitable"
    },
    priceRange: { min: 15000, max: 25000, currency: "INR" },
    availability: "uncommon",
    tags: ["indian", "hunting", "guardian", "sighthound"],
    isIndianBreed: true,
    isPopular: false
  },
  {
    name: "Mudhol Hound",
    species: "dog",
    breed: "Mudhol Hound",
    origin: "India (Karnataka)",
    size: "medium",
    weight: { min: 20, max: 30, unit: "kg" },
    height: { min: 60, max: 70, unit: "cm" },
    lifespan: { min: 12, max: 16, unit: "years" },
    temperament: ["loyal", "alert", "intelligent", "independent"],
    characteristics: {
      energy: "high",
      intelligence: "high",
      trainability: "moderate",
      social: "moderate",
      grooming: "minimal",
      shedding: "minimal",
      barking: "moderate"
    },
    care: {
      exercise: "Needs daily running and exercise",
      diet: "Balanced diet with lean proteins",
      grooming: "Minimal grooming required",
      health: "Generally healthy breed",
      training: "Requires patient, consistent training"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500", isPrimary: true }
    ],
    description: "The Mudhol Hound is a graceful sighthound from Karnataka, known for its speed and hunting prowess. Also called Caravan Hound.",
    history: "Bred by the royal family of Mudhol, this breed has been used for hunting and as a companion for centuries.",
    funFacts: [
      "Also known as Caravan Hound",
      "Excellent hunting dog",
      "Very fast runner",
      "Low maintenance breed"
    ],
    commonHealthIssues: [],
    suitability: {
      families: "suitable",
      children: "suitable",
      seniors: "not-suitable",
      apartments: "not-suitable",
      firstTimeOwners: "not-suitable"
    },
    priceRange: { min: 12000, max: 20000, currency: "INR" },
    availability: "uncommon",
    tags: ["indian", "hunting", "sighthound", "low-maintenance"],
    isIndianBreed: true,
    isPopular: false
  },
  {
    name: "Indian Pariah Dog",
    species: "dog",
    breed: "Indian Pariah Dog",
    origin: "India",
    size: "medium",
    weight: { min: 15, max: 25, unit: "kg" },
    height: { min: 45, max: 60, unit: "cm" },
    lifespan: { min: 12, max: 16, unit: "years" },
    temperament: ["loyal", "intelligent", "adaptable", "independent"],
    characteristics: {
      energy: "moderate",
      intelligence: "high",
      trainability: "easy",
      social: "social",
      grooming: "minimal",
      shedding: "moderate",
      barking: "moderate"
    },
    care: {
      exercise: "Moderate daily exercise",
      diet: "Balanced diet, very adaptable",
      grooming: "Minimal grooming needed",
      health: "Very healthy, natural immunity",
      training: "Easy to train, very intelligent"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1551717743-49959800b1f6?w=500", isPrimary: true }
    ],
    description: "The Indian Pariah Dog is a natural, indigenous breed that has evolved over thousands of years. Known for their intelligence and adaptability.",
    history: "One of the oldest dog breeds, naturally evolved in India over thousands of years without human intervention.",
    funFacts: [
      "One of the oldest dog breeds",
      "Natural immunity to many diseases",
      "Very intelligent and adaptable",
      "Excellent family companion"
    ],
    commonHealthIssues: [],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "suitable",
      apartments: "suitable",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 0, max: 5000, currency: "INR" },
    availability: "common",
    tags: ["indian", "natural", "healthy", "intelligent", "adaptable"],
    isIndianBreed: true,
    isPopular: true
  },
  {
    name: "Kanni",
    species: "dog",
    breed: "Kanni",
    origin: "India (Tamil Nadu)",
    size: "medium",
    weight: { min: 18, max: 28, unit: "kg" },
    height: { min: 55, max: 65, unit: "cm" },
    lifespan: { min: 12, max: 15, unit: "years" },
    temperament: ["loyal", "protective", "intelligent", "alert"],
    characteristics: {
      energy: "high",
      intelligence: "high",
      trainability: "moderate",
      social: "moderate",
      grooming: "minimal",
      shedding: "minimal",
      barking: "vocal"
    },
    care: {
      exercise: "Daily vigorous exercise required",
      diet: "High-quality protein diet",
      grooming: "Minimal grooming",
      health: "Generally healthy",
      training: "Early socialization important"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500", isPrimary: true }
    ],
    description: "The Kanni is a rare Indian sighthound from Tamil Nadu, known for its hunting abilities and loyalty.",
    history: "Bred by the royal families of Tamil Nadu for hunting and protection.",
    funFacts: [
      "Very rare breed",
      "Excellent hunting dog",
      "Very loyal to family",
      "Natural guard dog"
    ],
    commonHealthIssues: [],
    suitability: {
      families: "suitable",
      children: "suitable",
      seniors: "not-suitable",
      apartments: "not-suitable",
      firstTimeOwners: "not-suitable"
    },
    priceRange: { min: 20000, max: 35000, currency: "INR" },
    availability: "rare",
    tags: ["indian", "rare", "hunting", "guardian"],
    isIndianBreed: true,
    isRare: true
  },

  // Popular International Dog Breeds
  {
    name: "Golden Retriever",
    species: "dog",
    breed: "Golden Retriever",
    origin: "Scotland",
    size: "large",
    weight: { min: 25, max: 35, unit: "kg" },
    height: { min: 55, max: 61, unit: "cm" },
    lifespan: { min: 10, max: 12, unit: "years" },
    temperament: ["friendly", "intelligent", "loyal", "gentle"],
    characteristics: {
      energy: "high",
      intelligence: "very-high",
      trainability: "very-easy",
      social: "very-social",
      grooming: "high",
      shedding: "heavy",
      barking: "moderate"
    },
    care: {
      exercise: "Daily exercise and mental stimulation",
      diet: "High-quality dog food, watch for weight",
      grooming: "Daily brushing, regular baths",
      health: "Prone to hip dysplasia, regular vet checks",
      training: "Easy to train, loves to please"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500", isPrimary: true }
    ],
    description: "The Golden Retriever is one of the most popular family dogs, known for its friendly nature and beautiful golden coat.",
    history: "Developed in Scotland in the 1860s by Lord Tweedmouth, originally for hunting waterfowl.",
    funFacts: [
      "Excellent with children",
      "Great therapy dogs",
      "Love to swim",
      "Very trainable"
    ],
    commonHealthIssues: [
      { issue: "Hip Dysplasia", description: "Joint condition", prevention: "Regular exercise, proper nutrition" },
      { issue: "Cancer", description: "Higher risk than other breeds", prevention: "Regular vet checkups" }
    ],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "suitable",
      apartments: "suitable",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 25000, max: 50000, currency: "INR" },
    availability: "common",
    tags: ["family", "friendly", "intelligent", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Labrador Retriever",
    species: "dog",
    breed: "Labrador Retriever",
    origin: "Canada",
    size: "large",
    weight: { min: 25, max: 35, unit: "kg" },
    height: { min: 55, max: 62, unit: "cm" },
    lifespan: { min: 10, max: 14, unit: "years" },
    temperament: ["friendly", "outgoing", "active", "intelligent"],
    characteristics: {
      energy: "very-high",
      intelligence: "very-high",
      trainability: "very-easy",
      social: "very-social",
      grooming: "moderate",
      shedding: "heavy",
      barking: "moderate"
    },
    care: {
      exercise: "Needs lots of daily exercise",
      diet: "High-quality food, watch portion sizes",
      grooming: "Regular brushing, seasonal shedding",
      health: "Generally healthy, watch for obesity",
      training: "Very easy to train, eager to please"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500", isPrimary: true }
    ],
    description: "The Labrador Retriever is the most popular dog breed in the world, known for its friendly nature and versatility.",
    history: "Originated in Newfoundland, Canada, where they were used by fishermen to retrieve fish and nets.",
    funFacts: [
      "Most popular breed worldwide",
      "Excellent swimmers",
      "Great service dogs",
      "Love to eat (watch weight!)"
    ],
    commonHealthIssues: [
      { issue: "Obesity", description: "Tendency to overeat", prevention: "Portion control, regular exercise" },
      { issue: "Hip Dysplasia", description: "Joint condition", prevention: "Proper nutrition, avoid overfeeding" }
    ],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "suitable",
      apartments: "suitable",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 20000, max: 45000, currency: "INR" },
    availability: "common",
    tags: ["popular", "family", "active", "intelligent"],
    isIndianBreed: false,
    isPopular: true
  },

  // Indian Cat Breeds
  {
    name: "Bombay Cat",
    species: "cat",
    breed: "Bombay Cat",
    origin: "India",
    size: "medium",
    weight: { min: 3, max: 6, unit: "kg" },
    height: { min: 25, max: 30, unit: "cm" },
    lifespan: { min: 12, max: 16, unit: "years" },
    temperament: ["affectionate", "playful", "intelligent", "social"],
    characteristics: {
      energy: "moderate",
      intelligence: "high",
      trainability: "easy",
      social: "very-social",
      grooming: "minimal",
      shedding: "minimal",
      barking: "quiet"
    },
    care: {
      exercise: "Interactive play and toys",
      diet: "High-quality cat food",
      grooming: "Weekly brushing",
      health: "Generally healthy breed",
      training: "Easy to train, very intelligent"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500", isPrimary: true }
    ],
    description: "The Bombay Cat is a sleek, black cat with copper eyes, known for its dog-like personality and affectionate nature.",
    history: "Developed in the 1950s by crossing Burmese and American Shorthair cats to create a 'miniature panther'.",
    funFacts: [
      "Known as 'miniature panther'",
      "Very dog-like personality",
      "Loves to play fetch",
      "Excellent with children"
    ],
    commonHealthIssues: [],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 15000, max: 30000, currency: "INR" },
    availability: "uncommon",
    tags: ["indian", "black", "affectionate", "playful"],
    isIndianBreed: true,
    isPopular: false
  },

  // Popular International Cat Breeds
  {
    name: "Persian Cat",
    species: "cat",
    breed: "Persian Cat",
    origin: "Iran",
    size: "medium",
    weight: { min: 3, max: 7, unit: "kg" },
    height: { min: 25, max: 30, unit: "cm" },
    lifespan: { min: 12, max: 17, unit: "years" },
    temperament: ["calm", "gentle", "affectionate", "quiet"],
    characteristics: {
      energy: "low",
      intelligence: "moderate",
      trainability: "moderate",
      social: "moderate",
      grooming: "very-high",
      shedding: "heavy",
      barking: "quiet"
    },
    care: {
      exercise: "Gentle play, not very active",
      diet: "High-quality cat food",
      grooming: "Daily brushing essential",
      health: "Watch for breathing issues",
      training: "Gentle training approach"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500", isPrimary: true }
    ],
    description: "The Persian Cat is known for its long, luxurious coat and calm, gentle personality. Perfect for quiet households.",
    history: "One of the oldest cat breeds, originating from Persia (modern-day Iran) and brought to Europe in the 1600s.",
    funFacts: [
      "One of the oldest cat breeds",
      "Very calm and gentle",
      "Requires daily grooming",
      "Perfect lap cat"
    ],
    commonHealthIssues: [
      { issue: "Breathing Problems", description: "Due to flat face", prevention: "Regular vet checkups" },
      { issue: "Eye Issues", description: "Tear duct problems", prevention: "Daily eye cleaning" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 20000, max: 50000, currency: "INR" },
    availability: "common",
    tags: ["long-haired", "calm", "gentle", "popular"],
    isIndianBreed: false,
    isPopular: true
  },

  // Birds
  {
    name: "Indian Ringneck Parakeet",
    species: "bird",
    breed: "Indian Ringneck Parakeet",
    origin: "India",
    size: "small",
    weight: { min: 0.1, max: 0.15, unit: "kg" },
    height: { min: 35, max: 40, unit: "cm" },
    lifespan: { min: 20, max: 30, unit: "years" },
    temperament: ["intelligent", "vocal", "playful", "social"],
    characteristics: {
      energy: "high",
      intelligence: "very-high",
      trainability: "very-easy",
      social: "very-social",
      grooming: "minimal",
      shedding: "minimal",
      barking: "very-vocal"
    },
    care: {
      exercise: "Daily flight time and mental stimulation",
      diet: "Seeds, fruits, vegetables, pellets",
      grooming: "Regular nail trimming",
      health: "Generally healthy, watch for obesity",
      training: "Excellent talkers, easy to train"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500", isPrimary: true }
    ],
    description: "The Indian Ringneck Parakeet is a beautiful, intelligent bird known for its talking ability and vibrant colors.",
    history: "Native to India and surrounding regions, these birds have been kept as pets for centuries.",
    funFacts: [
      "Excellent talkers",
      "Very intelligent",
      "Can learn hundreds of words",
      "Long lifespan"
    ],
    commonHealthIssues: [
      { issue: "Obesity", description: "From overfeeding seeds", prevention: "Balanced diet" },
      { issue: "Feather Plucking", description: "Stress-related behavior", prevention: "Mental stimulation" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 5000, max: 15000, currency: "INR" },
    availability: "common",
    tags: ["indian", "talking", "intelligent", "colorful"],
    isIndianBreed: true,
    isPopular: true
  },

  // Fish
  {
    name: "Goldfish",
    species: "fish",
    breed: "Goldfish",
    origin: "China",
    size: "small",
    weight: { min: 0.1, max: 0.5, unit: "kg" },
    height: { min: 10, max: 20, unit: "cm" },
    lifespan: { min: 10, max: 20, unit: "years" },
    temperament: ["peaceful", "social", "active", "curious"],
    characteristics: {
      energy: "moderate",
      intelligence: "moderate",
      trainability: "easy",
      social: "social",
      grooming: "minimal",
      shedding: "none",
      barking: "quiet"
    },
    care: {
      exercise: "Swimming space, tank decorations",
      diet: "Fish flakes, pellets, vegetables",
      grooming: "Tank cleaning, water changes",
      health: "Water quality is crucial",
      training: "Can learn simple tricks"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500", isPrimary: true }
    ],
    description: "The Goldfish is one of the most popular aquarium fish, known for its beautiful colors and peaceful nature.",
    history: "Originated in China over 1000 years ago, originally bred from wild carp.",
    funFacts: [
      "Can live 20+ years",
      "Very intelligent",
      "Can recognize their owners",
      "Come in many varieties"
    ],
    commonHealthIssues: [
      { issue: "Poor Water Quality", description: "Leading cause of health issues", prevention: "Regular water changes" },
      { issue: "Overfeeding", description: "Can cause swim bladder issues", prevention: "Feed appropriate amounts" }
    ],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 50, max: 500, currency: "INR" },
    availability: "common",
    tags: ["beginner", "colorful", "peaceful", "popular"],
    isIndianBreed: false,
    isPopular: true
  }
];

const seedPetDictionary = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await PetDictionary.deleteMany({});
    console.log('Cleared existing pet dictionary data');
    
    // Insert new data
    const insertedPets = await PetDictionary.insertMany(petData);
    console.log(`Successfully seeded ${insertedPets.length} pets`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding pet dictionary:', error);
    process.exit(1);
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedPetDictionary();
}

export default seedPetDictionary;
