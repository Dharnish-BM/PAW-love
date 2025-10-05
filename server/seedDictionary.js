import mongoose from 'mongoose';
import PetDictionary from './models/PetDictionary.js';

// Comprehensive pet data for seeding
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
  // Cats
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
  },
  // More Dog Breeds
  {
    name: "German Shepherd",
    species: "dog",
    breed: "German Shepherd",
    origin: "Germany",
    size: "large",
    weight: { min: 30, max: 40, unit: "kg" },
    height: { min: 55, max: 65, unit: "cm" },
    lifespan: { min: 9, max: 13, unit: "years" },
    temperament: ["loyal", "intelligent", "confident", "protective"],
    characteristics: {
      energy: "high",
      intelligence: "very-high",
      trainability: "very-easy",
      social: "moderate",
      grooming: "moderate",
      shedding: "heavy",
      barking: "moderate"
    },
    care: {
      exercise: "Daily vigorous exercise and mental stimulation",
      diet: "High-quality protein diet",
      grooming: "Regular brushing, seasonal shedding",
      health: "Watch for hip dysplasia and bloat",
      training: "Excellent working dog, needs job"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500", isPrimary: true }
    ],
    description: "The German Shepherd is a versatile working dog known for its intelligence, loyalty, and protective nature.",
    history: "Developed in Germany in the late 1800s as a herding and working dog.",
    funFacts: [
      "Excellent police and military dogs",
      "Very intelligent and trainable",
      "Great family protectors",
      "Need mental stimulation"
    ],
    commonHealthIssues: [
      { issue: "Hip Dysplasia", description: "Joint condition", prevention: "Proper nutrition, avoid overfeeding" },
      { issue: "Bloat", description: "Life-threatening condition", prevention: "Multiple small meals, avoid exercise after eating" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "not-suitable",
      apartments: "not-suitable",
      firstTimeOwners: "not-suitable"
    },
    priceRange: { min: 30000, max: 60000, currency: "INR" },
    availability: "common",
    tags: ["working", "intelligent", "protective", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Beagle",
    species: "dog",
    breed: "Beagle",
    origin: "England",
    size: "medium",
    weight: { min: 9, max: 11, unit: "kg" },
    height: { min: 33, max: 41, unit: "cm" },
    lifespan: { min: 13, max: 16, unit: "years" },
    temperament: ["friendly", "curious", "merry", "gentle"],
    characteristics: {
      energy: "high",
      intelligence: "moderate",
      trainability: "moderate",
      social: "very-social",
      grooming: "minimal",
      shedding: "moderate",
      barking: "vocal"
    },
    care: {
      exercise: "Daily walks and playtime",
      diet: "High-quality food, watch for obesity",
      grooming: "Weekly brushing",
      health: "Generally healthy, watch weight",
      training: "Food-motivated, can be stubborn"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500", isPrimary: true }
    ],
    description: "The Beagle is a small to medium-sized hound known for its excellent sense of smell and friendly disposition.",
    history: "Developed in England for hunting rabbits and hares, known for their tracking abilities.",
    funFacts: [
      "Excellent sense of smell",
      "Great with children",
      "Can be vocal",
      "Food-motivated"
    ],
    commonHealthIssues: [
      { issue: "Obesity", description: "Tendency to overeat", prevention: "Portion control, regular exercise" },
      { issue: "Ear Infections", description: "Due to floppy ears", prevention: "Regular ear cleaning" }
    ],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "suitable",
      apartments: "suitable",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 15000, max: 30000, currency: "INR" },
    availability: "common",
    tags: ["family", "friendly", "hunting", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Poodle",
    species: "dog",
    breed: "Poodle",
    origin: "Germany",
    size: "medium",
    weight: { min: 20, max: 32, unit: "kg" },
    height: { min: 45, max: 60, unit: "cm" },
    lifespan: { min: 12, max: 15, unit: "years" },
    temperament: ["intelligent", "active", "proud", "alert"],
    characteristics: {
      energy: "high",
      intelligence: "very-high",
      trainability: "very-easy",
      social: "social",
      grooming: "very-high",
      shedding: "minimal",
      barking: "moderate"
    },
    care: {
      exercise: "Daily exercise and mental stimulation",
      diet: "High-quality food",
      grooming: "Professional grooming every 6-8 weeks",
      health: "Generally healthy, watch for hip issues",
      training: "Very intelligent, easy to train"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500", isPrimary: true }
    ],
    description: "The Poodle is an intelligent, elegant dog known for its curly coat and versatility in various activities.",
    history: "Originally bred in Germany as a water retriever, now popular as a companion and show dog.",
    funFacts: [
      "Very intelligent",
      "Hypoallergenic coat",
      "Excellent swimmers",
      "Great at agility"
    ],
    commonHealthIssues: [
      { issue: "Hip Dysplasia", description: "Joint condition", prevention: "Proper nutrition, avoid overfeeding" },
      { issue: "Eye Issues", description: "Progressive retinal atrophy", prevention: "Regular eye checkups" }
    ],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "suitable",
      apartments: "suitable",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 25000, max: 50000, currency: "INR" },
    availability: "common",
    tags: ["intelligent", "hypoallergenic", "elegant", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Bulldog",
    species: "dog",
    breed: "Bulldog",
    origin: "England",
    size: "medium",
    weight: { min: 18, max: 25, unit: "kg" },
    height: { min: 31, max: 40, unit: "cm" },
    lifespan: { min: 8, max: 12, unit: "years" },
    temperament: ["calm", "friendly", "gentle", "patient"],
    characteristics: {
      energy: "low",
      intelligence: "moderate",
      trainability: "moderate",
      social: "very-social",
      grooming: "minimal",
      shedding: "moderate",
      barking: "quiet"
    },
    care: {
      exercise: "Moderate exercise, avoid overheating",
      diet: "High-quality food, watch weight",
      grooming: "Weekly brushing, clean face folds",
      health: "Watch for breathing issues, hip problems",
      training: "Gentle, consistent training"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500", isPrimary: true }
    ],
    description: "The Bulldog is a medium-sized dog known for its distinctive wrinkled face and calm, friendly personality.",
    history: "Originally bred in England for bull-baiting, now a popular companion dog.",
    funFacts: [
      "Very calm and gentle",
      "Great with children",
      "Can overheat easily",
      "Snore loudly"
    ],
    commonHealthIssues: [
      { issue: "Breathing Problems", description: "Due to flat face", prevention: "Avoid overheating, regular vet checks" },
      { issue: "Hip Dysplasia", description: "Joint condition", prevention: "Proper nutrition, avoid overfeeding" }
    ],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 20000, max: 40000, currency: "INR" },
    availability: "common",
    tags: ["calm", "family", "gentle", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Siberian Husky",
    species: "dog",
    breed: "Siberian Husky",
    origin: "Russia",
    size: "large",
    weight: { min: 20, max: 27, unit: "kg" },
    height: { min: 51, max: 60, unit: "cm" },
    lifespan: { min: 12, max: 15, unit: "years" },
    temperament: ["friendly", "outgoing", "mischievous", "alert"],
    characteristics: {
      energy: "very-high",
      intelligence: "high",
      trainability: "moderate",
      social: "very-social",
      grooming: "high",
      shedding: "heavy",
      barking: "moderate"
    },
    care: {
      exercise: "Extensive daily exercise required",
      diet: "High-quality food, high energy needs",
      grooming: "Daily brushing, seasonal shedding",
      health: "Generally healthy, watch for hip issues",
      training: "Independent, can be challenging to train"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500", isPrimary: true }
    ],
    description: "The Siberian Husky is a medium-sized working dog known for its endurance and friendly nature.",
    history: "Bred by the Chukchi people of Siberia for sledding and companionship.",
    funFacts: [
      "Excellent sled dogs",
      "Very friendly with everyone",
      "Can be escape artists",
      "Love cold weather"
    ],
    commonHealthIssues: [
      { issue: "Hip Dysplasia", description: "Joint condition", prevention: "Proper nutrition, avoid overfeeding" },
      { issue: "Eye Issues", description: "Hereditary conditions", prevention: "Regular eye checkups" }
    ],
    suitability: {
      families: "suitable",
      children: "suitable",
      seniors: "not-suitable",
      apartments: "not-suitable",
      firstTimeOwners: "not-suitable"
    },
    priceRange: { min: 30000, max: 60000, currency: "INR" },
    availability: "common",
    tags: ["working", "energetic", "friendly", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  // More Cat Breeds
  {
    name: "Maine Coon",
    species: "cat",
    breed: "Maine Coon",
    origin: "United States",
    size: "large",
    weight: { min: 4, max: 8, unit: "kg" },
    height: { min: 25, max: 40, unit: "cm" },
    lifespan: { min: 13, max: 14, unit: "years" },
    temperament: ["gentle", "friendly", "intelligent", "playful"],
    characteristics: {
      energy: "moderate",
      intelligence: "high",
      trainability: "easy",
      social: "very-social",
      grooming: "high",
      shedding: "heavy",
      barking: "quiet"
    },
    care: {
      exercise: "Interactive play and climbing",
      diet: "High-quality cat food",
      grooming: "Daily brushing essential",
      health: "Watch for heart disease",
      training: "Very intelligent, easy to train"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500", isPrimary: true }
    ],
    description: "The Maine Coon is a large, friendly cat known for its long, shaggy coat and dog-like personality.",
    history: "One of the oldest natural breeds in North America, developed in Maine.",
    funFacts: [
      "Largest domestic cat breed",
      "Very dog-like personality",
      "Love water",
      "Excellent hunters"
    ],
    commonHealthIssues: [
      { issue: "Heart Disease", description: "Hypertrophic cardiomyopathy", prevention: "Regular vet checkups" },
      { issue: "Hip Dysplasia", description: "Joint condition", prevention: "Proper nutrition" }
    ],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "suitable",
      apartments: "suitable",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 30000, max: 80000, currency: "INR" },
    availability: "common",
    tags: ["large", "friendly", "intelligent", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Siamese Cat",
    species: "cat",
    breed: "Siamese Cat",
    origin: "Thailand",
    size: "medium",
    weight: { min: 3, max: 5, unit: "kg" },
    height: { min: 20, max: 25, unit: "cm" },
    lifespan: { min: 15, max: 20, unit: "years" },
    temperament: ["active", "intelligent", "vocal", "social"],
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
      exercise: "Interactive play and mental stimulation",
      diet: "High-quality cat food",
      grooming: "Weekly brushing",
      health: "Generally healthy",
      training: "Very intelligent, easy to train"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500", isPrimary: true }
    ],
    description: "The Siamese Cat is known for its distinctive color points, blue eyes, and vocal, intelligent personality.",
    history: "One of the oldest cat breeds, originating from Thailand (formerly Siam).",
    funFacts: [
      "Very vocal and talkative",
      "Extremely intelligent",
      "Love attention",
      "Can learn tricks"
    ],
    commonHealthIssues: [
      { issue: "Dental Issues", description: "Gum disease", prevention: "Regular dental care" },
      { issue: "Respiratory Issues", description: "Upper respiratory infections", prevention: "Regular vet checkups" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "suitable",
      apartments: "excellent",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 20000, max: 50000, currency: "INR" },
    availability: "common",
    tags: ["vocal", "intelligent", "active", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "British Shorthair",
    species: "cat",
    breed: "British Shorthair",
    origin: "England",
    size: "medium",
    weight: { min: 3, max: 7, unit: "kg" },
    height: { min: 22, max: 25, unit: "cm" },
    lifespan: { min: 12, max: 20, unit: "years" },
    temperament: ["calm", "gentle", "independent", "quiet"],
    characteristics: {
      energy: "low",
      intelligence: "moderate",
      trainability: "moderate",
      social: "moderate",
      grooming: "moderate",
      shedding: "moderate",
      barking: "quiet"
    },
    care: {
      exercise: "Gentle play, not very active",
      diet: "High-quality cat food",
      grooming: "Weekly brushing",
      health: "Generally healthy",
      training: "Independent, moderate trainability"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500", isPrimary: true }
    ],
    description: "The British Shorthair is a calm, gentle cat known for its round face and plush coat.",
    history: "One of the oldest English cat breeds, developed from street cats in England.",
    funFacts: [
      "Very calm and gentle",
      "Independent nature",
      "Great for quiet households",
      "Teddy bear appearance"
    ],
    commonHealthIssues: [
      { issue: "Obesity", description: "Tendency to gain weight", prevention: "Portion control, regular exercise" },
      { issue: "Heart Disease", description: "Hypertrophic cardiomyopathy", prevention: "Regular vet checkups" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 25000, max: 60000, currency: "INR" },
    availability: "common",
    tags: ["calm", "gentle", "independent", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  // More Bird Species
  {
    name: "Budgerigar",
    species: "bird",
    breed: "Budgerigar",
    origin: "Australia",
    size: "tiny",
    weight: { min: 0.03, max: 0.04, unit: "kg" },
    height: { min: 15, max: 20, unit: "cm" },
    lifespan: { min: 5, max: 10, unit: "years" },
    temperament: ["social", "playful", "intelligent", "vocal"],
    characteristics: {
      energy: "high",
      intelligence: "high",
      trainability: "easy",
      social: "very-social",
      grooming: "minimal",
      shedding: "minimal",
      barking: "vocal"
    },
    care: {
      exercise: "Daily flight time and toys",
      diet: "Seeds, pellets, fruits, vegetables",
      grooming: "Regular nail trimming",
      health: "Generally healthy",
      training: "Can learn to talk and do tricks"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500", isPrimary: true }
    ],
    description: "The Budgerigar (Budgie) is a small, colorful parrot known for its ability to mimic speech and playful nature.",
    history: "Native to Australia, these birds have been kept as pets for over 150 years.",
    funFacts: [
      "Can learn to talk",
      "Very social birds",
      "Come in many colors",
      "Great for beginners"
    ],
    commonHealthIssues: [
      { issue: "Respiratory Issues", description: "Sensitive to fumes", prevention: "Avoid scented products" },
      { issue: "Obesity", description: "From overfeeding seeds", prevention: "Balanced diet" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 500, max: 2000, currency: "INR" },
    availability: "common",
    tags: ["beginner", "talking", "colorful", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Cockatiel",
    species: "bird",
    breed: "Cockatiel",
    origin: "Australia",
    size: "small",
    weight: { min: 0.08, max: 0.1, unit: "kg" },
    height: { min: 25, max: 33, unit: "cm" },
    lifespan: { min: 15, max: 25, unit: "years" },
    temperament: ["gentle", "affectionate", "intelligent", "social"],
    characteristics: {
      energy: "moderate",
      intelligence: "high",
      trainability: "easy",
      social: "very-social",
      grooming: "minimal",
      shedding: "minimal",
      barking: "moderate"
    },
    care: {
      exercise: "Daily out-of-cage time",
      diet: "Pellets, seeds, fruits, vegetables",
      grooming: "Regular nail trimming",
      health: "Generally healthy",
      training: "Very trainable, can learn tricks"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500", isPrimary: true }
    ],
    description: "The Cockatiel is a gentle, affectionate bird known for its beautiful crest and whistling abilities.",
    history: "Native to Australia, these birds have been popular pets for over 100 years.",
    funFacts: [
      "Very gentle and affectionate",
      "Can learn to whistle tunes",
      "Beautiful crest",
      "Great companions"
    ],
    commonHealthIssues: [
      { issue: "Respiratory Issues", description: "Sensitive to fumes", prevention: "Avoid scented products" },
      { issue: "Feather Plucking", description: "Stress-related behavior", prevention: "Mental stimulation" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 3000, max: 8000, currency: "INR" },
    availability: "common",
    tags: ["gentle", "affectionate", "whistling", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  // More Fish Species
  {
    name: "Betta Fish",
    species: "fish",
    breed: "Betta Fish",
    origin: "Thailand",
    size: "tiny",
    weight: { min: 0.01, max: 0.02, unit: "kg" },
    height: { min: 6, max: 8, unit: "cm" },
    lifespan: { min: 2, max: 5, unit: "years" },
    temperament: ["aggressive", "territorial", "beautiful", "active"],
    characteristics: {
      energy: "moderate",
      intelligence: "moderate",
      trainability: "easy",
      social: "independent",
      grooming: "minimal",
      shedding: "none",
      barking: "quiet"
    },
    care: {
      exercise: "Swimming space, tank decorations",
      diet: "Betta pellets, bloodworms, brine shrimp",
      grooming: "Tank cleaning, water changes",
      health: "Water quality crucial, avoid cold water",
      training: "Can learn to follow finger"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500", isPrimary: true }
    ],
    description: "The Betta Fish is a beautiful, colorful fish known for its flowing fins and territorial nature.",
    history: "Native to Thailand, these fish have been bred for their beauty for centuries.",
    funFacts: [
      "Very beautiful colors",
      "Can breathe air",
      "Territorial with other bettas",
      "Easy to care for"
    ],
    commonHealthIssues: [
      { issue: "Fin Rot", description: "Bacterial infection", prevention: "Clean water, proper nutrition" },
      { issue: "Ich", description: "Parasitic infection", prevention: "Quarantine new fish" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 100, max: 1000, currency: "INR" },
    availability: "common",
    tags: ["colorful", "beautiful", "easy-care", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Guppy",
    species: "fish",
    breed: "Guppy",
    origin: "South America",
    size: "tiny",
    weight: { min: 0.005, max: 0.01, unit: "kg" },
    height: { min: 3, max: 6, unit: "cm" },
    lifespan: { min: 1, max: 3, unit: "years" },
    temperament: ["peaceful", "active", "colorful", "social"],
    characteristics: {
      energy: "high",
      intelligence: "moderate",
      trainability: "easy",
      social: "very-social",
      grooming: "minimal",
      shedding: "none",
      barking: "quiet"
    },
    care: {
      exercise: "Swimming space, plants",
      diet: "Flakes, pellets, live food",
      grooming: "Tank cleaning, water changes",
      health: "Generally hardy",
      training: "Can learn feeding routines"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500", isPrimary: true }
    ],
    description: "The Guppy is a small, colorful fish known for its hardiness and prolific breeding.",
    history: "Native to South America, these fish are popular for their bright colors and ease of care.",
    funFacts: [
      "Very colorful",
      "Easy to breed",
      "Great for beginners",
      "Peaceful community fish"
    ],
    commonHealthIssues: [
      { issue: "Disease", description: "Various fish diseases", prevention: "Quarantine new fish" },
      { issue: "Overcrowding", description: "From rapid breeding", prevention: "Separate males and females" }
    ],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 20, max: 100, currency: "INR" },
    availability: "common",
    tags: ["colorful", "beginner", "hardy", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  // Small Mammals
  {
    name: "Hamster",
    species: "hamster",
    breed: "Syrian Hamster",
    origin: "Syria",
    size: "tiny",
    weight: { min: 0.1, max: 0.2, unit: "kg" },
    height: { min: 8, max: 12, unit: "cm" },
    lifespan: { min: 2, max: 3, unit: "years" },
    temperament: ["curious", "active", "nocturnal", "solitary"],
    characteristics: {
      energy: "high",
      intelligence: "moderate",
      trainability: "moderate",
      social: "independent",
      grooming: "minimal",
      shedding: "minimal",
      barking: "quiet"
    },
    care: {
      exercise: "Exercise wheel, toys, tunnels",
      diet: "Hamster mix, fresh vegetables",
      grooming: "Sand bath for cleaning",
      health: "Generally healthy",
      training: "Can learn simple tricks"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500", isPrimary: true }
    ],
    description: "The Hamster is a small, nocturnal rodent known for its cheek pouches and active nature.",
    history: "Originally from Syria, these rodents have been popular pets since the 1930s.",
    funFacts: [
      "Store food in cheek pouches",
      "Nocturnal animals",
      "Very active at night",
      "Solitary animals"
    ],
    commonHealthIssues: [
      { issue: "Wet Tail", description: "Bacterial infection", prevention: "Clean cage, stress reduction" },
      { issue: "Obesity", description: "From overfeeding", prevention: "Portion control" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "suitable",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 500, max: 2000, currency: "INR" },
    availability: "common",
    tags: ["nocturnal", "active", "easy-care", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Guinea Pig",
    species: "guinea-pig",
    breed: "Guinea Pig",
    origin: "South America",
    size: "small",
    weight: { min: 0.7, max: 1.1, unit: "kg" },
    height: { min: 20, max: 25, unit: "cm" },
    lifespan: { min: 4, max: 8, unit: "years" },
    temperament: ["gentle", "social", "vocal", "curious"],
    characteristics: {
      energy: "moderate",
      intelligence: "moderate",
      trainability: "easy",
      social: "very-social",
      grooming: "moderate",
      shedding: "moderate",
      barking: "vocal"
    },
    care: {
      exercise: "Large cage, floor time",
      diet: "Hay, pellets, fresh vegetables",
      grooming: "Regular brushing, nail trimming",
      health: "Need vitamin C",
      training: "Can learn to come when called"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500", isPrimary: true }
    ],
    description: "The Guinea Pig is a gentle, social rodent known for its vocalizations and friendly nature.",
    history: "Originally from South America, these animals have been kept as pets for centuries.",
    funFacts: [
      "Very vocal animals",
      "Need vitamin C",
      "Social animals",
      "Great with children"
    ],
    commonHealthIssues: [
      { issue: "Scurvy", description: "Vitamin C deficiency", prevention: "Fresh vegetables daily" },
      { issue: "Dental Issues", description: "Overgrown teeth", prevention: "Hay and chew toys" }
    ],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "suitable",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 1000, max: 3000, currency: "INR" },
    availability: "common",
    tags: ["gentle", "social", "vocal", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Rabbit",
    species: "rabbit",
    breed: "Holland Lop",
    origin: "Netherlands",
    size: "small",
    weight: { min: 1, max: 2, unit: "kg" },
    height: { min: 20, max: 25, unit: "cm" },
    lifespan: { min: 7, max: 12, unit: "years" },
    temperament: ["gentle", "playful", "intelligent", "social"],
    characteristics: {
      energy: "moderate",
      intelligence: "high",
      trainability: "easy",
      social: "very-social",
      grooming: "moderate",
      shedding: "moderate",
      barking: "quiet"
    },
    care: {
      exercise: "Daily exercise, large space",
      diet: "Hay, pellets, fresh vegetables",
      grooming: "Regular brushing",
      health: "Dental care important",
      training: "Can be litter trained"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500", isPrimary: true }
    ],
    description: "The Holland Lop is a small, gentle rabbit known for its floppy ears and friendly personality.",
    history: "Developed in the Netherlands in the 1950s by crossing French Lops with Netherland Dwarfs.",
    funFacts: [
      "Very gentle and friendly",
      "Can be litter trained",
      "Love to play",
      "Great with children"
    ],
    commonHealthIssues: [
      { issue: "Dental Issues", description: "Overgrown teeth", prevention: "Hay and chew toys" },
      { issue: "GI Stasis", description: "Digestive issue", prevention: "Proper diet, exercise" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "suitable",
      apartments: "suitable",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 3000, max: 8000, currency: "INR" },
    availability: "common",
    tags: ["gentle", "playful", "intelligent", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  // More Dog Breeds
  {
    name: "Rottweiler",
    species: "dog",
    breed: "Rottweiler",
    origin: "Germany",
    size: "large",
    weight: { min: 35, max: 60, unit: "kg" },
    height: { min: 56, max: 69, unit: "cm" },
    lifespan: { min: 8, max: 11, unit: "years" },
    temperament: ["loyal", "confident", "calm", "protective"],
    characteristics: {
      energy: "moderate",
      intelligence: "high",
      trainability: "easy",
      social: "moderate",
      grooming: "minimal",
      shedding: "moderate",
      barking: "moderate"
    },
    care: {
      exercise: "Daily exercise and mental stimulation",
      diet: "High-quality protein diet",
      grooming: "Weekly brushing",
      health: "Watch for hip dysplasia and heart issues",
      training: "Early socialization and training essential"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500", isPrimary: true }
    ],
    description: "The Rottweiler is a powerful, confident dog known for its loyalty and protective nature.",
    history: "Originally bred in Germany as a herding and guard dog.",
    funFacts: [
      "Excellent guard dogs",
      "Very loyal to family",
      "Need early socialization",
      "Strong and powerful"
    ],
    commonHealthIssues: [
      { issue: "Hip Dysplasia", description: "Joint condition", prevention: "Proper nutrition, avoid overfeeding" },
      { issue: "Heart Disease", description: "Aortic stenosis", prevention: "Regular vet checkups" }
    ],
    suitability: {
      families: "suitable",
      children: "suitable",
      seniors: "not-suitable",
      apartments: "not-suitable",
      firstTimeOwners: "not-suitable"
    },
    priceRange: { min: 25000, max: 50000, currency: "INR" },
    availability: "common",
    tags: ["protective", "loyal", "powerful", "guardian"],
    isIndianBreed: false,
    isPopular: false
  },
  {
    name: "Chihuahua",
    species: "dog",
    breed: "Chihuahua",
    origin: "Mexico",
    size: "tiny",
    weight: { min: 1, max: 3, unit: "kg" },
    height: { min: 15, max: 23, unit: "cm" },
    lifespan: { min: 14, max: 16, unit: "years" },
    temperament: ["loyal", "alert", "sassy", "intelligent"],
    characteristics: {
      energy: "moderate",
      intelligence: "high",
      trainability: "moderate",
      social: "moderate",
      grooming: "minimal",
      shedding: "minimal",
      barking: "vocal"
    },
    care: {
      exercise: "Short walks, indoor play",
      diet: "High-quality small breed food",
      grooming: "Weekly brushing",
      health: "Watch for dental issues",
      training: "Can be stubborn, needs patience"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500", isPrimary: true }
    ],
    description: "The Chihuahua is the world's smallest dog breed, known for its big personality and loyalty.",
    history: "Originated in Mexico, named after the Mexican state of Chihuahua.",
    funFacts: [
      "World's smallest dog breed",
      "Big personality in small package",
      "Can be very vocal",
      "Great apartment dogs"
    ],
    commonHealthIssues: [
      { issue: "Dental Issues", description: "Small mouth, crowded teeth", prevention: "Regular dental care" },
      { issue: "Patellar Luxation", description: "Knee cap dislocation", prevention: "Avoid jumping from heights" }
    ],
    suitability: {
      families: "suitable",
      children: "not-suitable",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 15000, max: 35000, currency: "INR" },
    availability: "common",
    tags: ["tiny", "loyal", "vocal", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Border Collie",
    species: "dog",
    breed: "Border Collie",
    origin: "Scotland",
    size: "medium",
    weight: { min: 14, max: 20, unit: "kg" },
    height: { min: 46, max: 56, unit: "cm" },
    lifespan: { min: 12, max: 15, unit: "years" },
    temperament: ["intelligent", "energetic", "loyal", "workaholic"],
    characteristics: {
      energy: "very-high",
      intelligence: "very-high",
      trainability: "very-easy",
      social: "social",
      grooming: "moderate",
      shedding: "moderate",
      barking: "moderate"
    },
    care: {
      exercise: "Extensive daily exercise and mental stimulation",
      diet: "High-quality food, high energy needs",
      grooming: "Weekly brushing",
      health: "Generally healthy",
      training: "Excellent working dog, needs job"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500", isPrimary: true }
    ],
    description: "The Border Collie is considered the most intelligent dog breed, known for its herding abilities and work ethic.",
    history: "Developed on the border between Scotland and England for herding sheep.",
    funFacts: [
      "Most intelligent dog breed",
      "Excellent herding dogs",
      "Need lots of mental stimulation",
      "Great at agility"
    ],
    commonHealthIssues: [
      { issue: "Hip Dysplasia", description: "Joint condition", prevention: "Proper nutrition, avoid overfeeding" },
      { issue: "Eye Issues", description: "Collie eye anomaly", prevention: "Regular eye checkups" }
    ],
    suitability: {
      families: "suitable",
      children: "suitable",
      seniors: "not-suitable",
      apartments: "not-suitable",
      firstTimeOwners: "not-suitable"
    },
    priceRange: { min: 20000, max: 40000, currency: "INR" },
    availability: "common",
    tags: ["intelligent", "working", "energetic", "herding"],
    isIndianBreed: false,
    isPopular: false
  },
  {
    name: "Dachshund",
    species: "dog",
    breed: "Dachshund",
    origin: "Germany",
    size: "small",
    weight: { min: 7, max: 15, unit: "kg" },
    height: { min: 20, max: 25, unit: "cm" },
    lifespan: { min: 12, max: 16, unit: "years" },
    temperament: ["loyal", "playful", "stubborn", "brave"],
    characteristics: {
      energy: "moderate",
      intelligence: "high",
      trainability: "moderate",
      social: "social",
      grooming: "minimal",
      shedding: "moderate",
      barking: "vocal"
    },
    care: {
      exercise: "Moderate exercise, avoid jumping",
      diet: "High-quality food, watch weight",
      grooming: "Weekly brushing",
      health: "Watch for back problems",
      training: "Can be stubborn, needs patience"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500", isPrimary: true }
    ],
    description: "The Dachshund is a small dog with a long body and short legs, known for its hunting abilities and distinctive appearance.",
    history: "Developed in Germany to hunt badgers, known for their courage and determination.",
    funFacts: [
      "Originally bred to hunt badgers",
      "Very brave despite small size",
      "Can be stubborn",
      "Great family dogs"
    ],
    commonHealthIssues: [
      { issue: "Back Problems", description: "Intervertebral disc disease", prevention: "Avoid jumping, maintain healthy weight" },
      { issue: "Obesity", description: "Tendency to gain weight", prevention: "Portion control, regular exercise" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "suitable",
      apartments: "excellent",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 15000, max: 30000, currency: "INR" },
    availability: "common",
    tags: ["loyal", "playful", "brave", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Shih Tzu",
    species: "dog",
    breed: "Shih Tzu",
    origin: "China",
    size: "small",
    weight: { min: 4, max: 7, unit: "kg" },
    height: { min: 20, max: 28, unit: "cm" },
    lifespan: { min: 10, max: 18, unit: "years" },
    temperament: ["affectionate", "playful", "outgoing", "gentle"],
    characteristics: {
      energy: "low",
      intelligence: "moderate",
      trainability: "moderate",
      social: "very-social",
      grooming: "very-high",
      shedding: "minimal",
      barking: "moderate"
    },
    care: {
      exercise: "Short walks, indoor play",
      diet: "High-quality small breed food",
      grooming: "Daily brushing, professional grooming",
      health: "Watch for breathing issues",
      training: "Can be stubborn, needs patience"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500", isPrimary: true }
    ],
    description: "The Shih Tzu is a small, affectionate dog known for its long, flowing coat and friendly personality.",
    history: "Originated in China, bred as companion dogs for Chinese royalty.",
    funFacts: [
      "Bred for Chinese royalty",
      "Very affectionate",
      "Requires daily grooming",
      "Great lap dogs"
    ],
    commonHealthIssues: [
      { issue: "Breathing Problems", description: "Due to flat face", prevention: "Avoid overheating" },
      { issue: "Eye Issues", description: "Protruding eyes", prevention: "Regular eye cleaning" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 20000, max: 45000, currency: "INR" },
    availability: "common",
    tags: ["affectionate", "gentle", "long-haired", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  // More Cat Breeds
  {
    name: "Ragdoll",
    species: "cat",
    breed: "Ragdoll",
    origin: "United States",
    size: "large",
    weight: { min: 4, max: 9, unit: "kg" },
    height: { min: 25, max: 35, unit: "cm" },
    lifespan: { min: 12, max: 17, unit: "years" },
    temperament: ["gentle", "calm", "affectionate", "docile"],
    characteristics: {
      energy: "low",
      intelligence: "moderate",
      trainability: "easy",
      social: "very-social",
      grooming: "moderate",
      shedding: "moderate",
      barking: "quiet"
    },
    care: {
      exercise: "Gentle play, not very active",
      diet: "High-quality cat food",
      grooming: "Weekly brushing",
      health: "Watch for heart disease",
      training: "Very gentle, easy to handle"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500", isPrimary: true }
    ],
    description: "The Ragdoll is a large, gentle cat known for going limp when picked up, hence the name 'ragdoll'.",
    history: "Developed in California in the 1960s by Ann Baker.",
    funFacts: [
      "Go limp when picked up",
      "Very gentle and calm",
      "Great with children",
      "Large and heavy"
    ],
    commonHealthIssues: [
      { issue: "Heart Disease", description: "Hypertrophic cardiomyopathy", prevention: "Regular vet checkups" },
      { issue: "Obesity", description: "Tendency to gain weight", prevention: "Portion control" }
    ],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 25000, max: 60000, currency: "INR" },
    availability: "common",
    tags: ["gentle", "calm", "large", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Scottish Fold",
    species: "cat",
    breed: "Scottish Fold",
    origin: "Scotland",
    size: "medium",
    weight: { min: 3, max: 6, unit: "kg" },
    height: { min: 20, max: 25, unit: "cm" },
    lifespan: { min: 11, max: 15, unit: "years" },
    temperament: ["gentle", "calm", "affectionate", "quiet"],
    characteristics: {
      energy: "low",
      intelligence: "moderate",
      trainability: "moderate",
      social: "moderate",
      grooming: "minimal",
      shedding: "minimal",
      barking: "quiet"
    },
    care: {
      exercise: "Gentle play, not very active",
      diet: "High-quality cat food",
      grooming: "Weekly brushing",
      health: "Watch for joint issues",
      training: "Gentle and easy to handle"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500", isPrimary: true }
    ],
    description: "The Scottish Fold is known for its distinctive folded ears and calm, gentle personality.",
    history: "Developed in Scotland in the 1960s from a cat with naturally folded ears.",
    funFacts: [
      "Folded ears are genetic trait",
      "Very calm and gentle",
      "Great with children",
      "Quiet and peaceful"
    ],
    commonHealthIssues: [
      { issue: "Joint Issues", description: "Osteochondrodysplasia", prevention: "Regular vet checkups" },
      { issue: "Ear Issues", description: "Due to folded ears", prevention: "Regular ear cleaning" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 30000, max: 70000, currency: "INR" },
    availability: "uncommon",
    tags: ["gentle", "calm", "folded-ears", "unique"],
    isIndianBreed: false,
    isPopular: false
  },
  {
    name: "Bengal Cat",
    species: "cat",
    breed: "Bengal Cat",
    origin: "United States",
    size: "large",
    weight: { min: 4, max: 7, unit: "kg" },
    height: { min: 25, max: 30, unit: "cm" },
    lifespan: { min: 12, max: 16, unit: "years" },
    temperament: ["active", "intelligent", "playful", "energetic"],
    characteristics: {
      energy: "high",
      intelligence: "very-high",
      trainability: "very-easy",
      social: "very-social",
      grooming: "minimal",
      shedding: "minimal",
      barking: "moderate"
    },
    care: {
      exercise: "Lots of play and mental stimulation",
      diet: "High-quality cat food",
      grooming: "Weekly brushing",
      health: "Generally healthy",
      training: "Very intelligent, can learn tricks"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500", isPrimary: true }
    ],
    description: "The Bengal Cat is a large, active cat known for its wild appearance and domestic temperament.",
    history: "Developed by crossing domestic cats with Asian leopard cats.",
    funFacts: [
      "Wild appearance, domestic temperament",
      "Very active and playful",
      "Can learn to walk on leash",
      "Love water"
    ],
    commonHealthIssues: [
      { issue: "Heart Disease", description: "Hypertrophic cardiomyopathy", prevention: "Regular vet checkups" },
      { issue: "Kidney Issues", description: "Progressive retinal atrophy", prevention: "Regular health monitoring" }
    ],
    suitability: {
      families: "suitable",
      children: "suitable",
      seniors: "not-suitable",
      apartments: "suitable",
      firstTimeOwners: "not-suitable"
    },
    priceRange: { min: 40000, max: 100000, currency: "INR" },
    availability: "uncommon",
    tags: ["active", "intelligent", "wild-appearance", "unique"],
    isIndianBreed: false,
    isPopular: false
  },
  // More Bird Species
  {
    name: "African Grey Parrot",
    species: "bird",
    breed: "African Grey Parrot",
    origin: "Africa",
    size: "medium",
    weight: { min: 0.4, max: 0.65, unit: "kg" },
    height: { min: 28, max: 33, unit: "cm" },
    lifespan: { min: 40, max: 60, unit: "years" },
    temperament: ["intelligent", "sensitive", "vocal", "social"],
    characteristics: {
      energy: "moderate",
      intelligence: "very-high",
      trainability: "very-easy",
      social: "very-social",
      grooming: "minimal",
      shedding: "minimal",
      barking: "very-vocal"
    },
    care: {
      exercise: "Daily out-of-cage time and mental stimulation",
      diet: "Pellets, fruits, vegetables, nuts",
      grooming: "Regular nail trimming",
      health: "Generally healthy, watch for feather plucking",
      training: "Excellent talkers, very intelligent"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500", isPrimary: true }
    ],
    description: "The African Grey Parrot is considered the most intelligent bird species, known for its exceptional talking abilities.",
    history: "Native to the rainforests of West and Central Africa.",
    funFacts: [
      "Most intelligent bird species",
      "Excellent talkers",
      "Can learn hundreds of words",
      "Very long lifespan"
    ],
    commonHealthIssues: [
      { issue: "Feather Plucking", description: "Stress-related behavior", prevention: "Mental stimulation, proper care" },
      { issue: "Respiratory Issues", description: "Sensitive to fumes", prevention: "Avoid scented products" }
    ],
    suitability: {
      families: "suitable",
      children: "not-suitable",
      seniors: "excellent",
      apartments: "suitable",
      firstTimeOwners: "not-suitable"
    },
    priceRange: { min: 50000, max: 150000, currency: "INR" },
    availability: "uncommon",
    tags: ["intelligent", "talking", "long-lived", "unique"],
    isIndianBreed: false,
    isPopular: false
  },
  {
    name: "Canary",
    species: "bird",
    breed: "Canary",
    origin: "Canary Islands",
    size: "tiny",
    weight: { min: 0.01, max: 0.02, unit: "kg" },
    height: { min: 12, max: 15, unit: "cm" },
    lifespan: { min: 7, max: 10, unit: "years" },
    temperament: ["cheerful", "active", "vocal", "social"],
    characteristics: {
      energy: "high",
      intelligence: "moderate",
      trainability: "moderate",
      social: "social",
      grooming: "minimal",
      shedding: "minimal",
      barking: "vocal"
    },
    care: {
      exercise: "Flight time in large cage",
      diet: "Seeds, pellets, fresh vegetables",
      grooming: "Regular nail trimming",
      health: "Generally healthy",
      training: "Can learn simple tricks"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500", isPrimary: true }
    ],
    description: "The Canary is a small, cheerful bird known for its beautiful singing and bright colors.",
    history: "Native to the Canary Islands, these birds have been kept as pets for centuries.",
    funFacts: [
      "Beautiful singers",
      "Very cheerful",
      "Come in many colors",
      "Great for beginners"
    ],
    commonHealthIssues: [
      { issue: "Respiratory Issues", description: "Sensitive to fumes", prevention: "Avoid scented products" },
      { issue: "Obesity", description: "From overfeeding seeds", prevention: "Balanced diet" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 1000, max: 5000, currency: "INR" },
    availability: "common",
    tags: ["singing", "colorful", "cheerful", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  // More Fish Species
  {
    name: "Angelfish",
    species: "fish",
    breed: "Angelfish",
    origin: "South America",
    size: "small",
    weight: { min: 0.1, max: 0.2, unit: "kg" },
    height: { min: 15, max: 20, unit: "cm" },
    lifespan: { min: 10, max: 12, unit: "years" },
    temperament: ["peaceful", "graceful", "territorial", "beautiful"],
    characteristics: {
      energy: "moderate",
      intelligence: "moderate",
      trainability: "easy",
      social: "moderate",
      grooming: "minimal",
      shedding: "none",
      barking: "quiet"
    },
    care: {
      exercise: "Swimming space, plants",
      diet: "Flakes, pellets, live food",
      grooming: "Tank cleaning, water changes",
      health: "Generally hardy",
      training: "Can learn feeding routines"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500", isPrimary: true }
    ],
    description: "The Angelfish is a beautiful, graceful fish known for its triangular shape and peaceful nature.",
    history: "Native to the Amazon River basin in South America.",
    funFacts: [
      "Very graceful swimmers",
      "Beautiful triangular shape",
      "Can be territorial",
      "Great centerpiece fish"
    ],
    commonHealthIssues: [
      { issue: "Ich", description: "Parasitic infection", prevention: "Quarantine new fish" },
      { issue: "Fin Rot", description: "Bacterial infection", prevention: "Clean water, proper nutrition" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 200, max: 1000, currency: "INR" },
    availability: "common",
    tags: ["graceful", "beautiful", "peaceful", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Neon Tetra",
    species: "fish",
    breed: "Neon Tetra",
    origin: "South America",
    size: "tiny",
    weight: { min: 0.005, max: 0.01, unit: "kg" },
    height: { min: 3, max: 4, unit: "cm" },
    lifespan: { min: 5, max: 8, unit: "years" },
    temperament: ["peaceful", "active", "schooling", "colorful"],
    characteristics: {
      energy: "high",
      intelligence: "moderate",
      trainability: "easy",
      social: "very-social",
      grooming: "minimal",
      shedding: "none",
      barking: "quiet"
    },
    care: {
      exercise: "Swimming space, school of 6+",
      diet: "Flakes, pellets, live food",
      grooming: "Tank cleaning, water changes",
      health: "Generally hardy",
      training: "Can learn feeding routines"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500", isPrimary: true }
    ],
    description: "The Neon Tetra is a small, colorful fish known for its bright blue and red stripes and schooling behavior.",
    history: "Native to the Amazon River basin in South America.",
    funFacts: [
      "Very colorful",
      "Schooling fish",
      "Great for community tanks",
      "Easy to care for"
    ],
    commonHealthIssues: [
      { issue: "Neon Tetra Disease", description: "Parasitic infection", prevention: "Quarantine new fish" },
      { issue: "Ich", description: "Parasitic infection", prevention: "Quarantine new fish" }
    ],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 50, max: 200, currency: "INR" },
    availability: "common",
    tags: ["colorful", "schooling", "beginner", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  // More Dog Breeds
  {
    name: "Yorkshire Terrier",
    species: "dog",
    breed: "Yorkshire Terrier",
    origin: "England",
    size: "tiny",
    weight: { min: 2, max: 3, unit: "kg" },
    height: { min: 18, max: 20, unit: "cm" },
    lifespan: { min: 13, max: 16, unit: "years" },
    temperament: ["loyal", "intelligent", "bold", "energetic"],
    characteristics: {
      energy: "high",
      intelligence: "high",
      trainability: "moderate",
      social: "moderate",
      grooming: "very-high",
      shedding: "minimal",
      barking: "vocal"
    },
    care: {
      exercise: "Daily walks and play",
      diet: "High-quality small breed food",
      grooming: "Daily brushing, professional grooming",
      health: "Watch for dental issues",
      training: "Can be stubborn, needs patience"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500", isPrimary: true }
    ],
    description: "The Yorkshire Terrier is a small, confident dog known for its long, silky coat and big personality.",
    history: "Developed in Yorkshire, England, originally for catching rats in textile mills.",
    funFacts: [
      "Originally bred to catch rats",
      "Very confident despite small size",
      "Requires daily grooming",
      "Great apartment dogs"
    ],
    commonHealthIssues: [
      { issue: "Dental Issues", description: "Small mouth, crowded teeth", prevention: "Regular dental care" },
      { issue: "Patellar Luxation", description: "Knee cap dislocation", prevention: "Avoid jumping from heights" }
    ],
    suitability: {
      families: "suitable",
      children: "not-suitable",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 20000, max: 50000, currency: "INR" },
    availability: "common",
    tags: ["tiny", "confident", "long-haired", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Boxer",
    species: "dog",
    breed: "Boxer",
    origin: "Germany",
    size: "large",
    weight: { min: 25, max: 32, unit: "kg" },
    height: { min: 53, max: 63, unit: "cm" },
    lifespan: { min: 10, max: 12, unit: "years" },
    temperament: ["loyal", "playful", "energetic", "patient"],
    characteristics: {
      energy: "high",
      intelligence: "high",
      trainability: "easy",
      social: "very-social",
      grooming: "minimal",
      shedding: "moderate",
      barking: "moderate"
    },
    care: {
      exercise: "Daily vigorous exercise",
      diet: "High-quality food",
      grooming: "Weekly brushing",
      health: "Watch for heart disease and cancer",
      training: "Easy to train, eager to please"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500", isPrimary: true }
    ],
    description: "The Boxer is a medium to large dog known for its playful nature and protective instincts.",
    history: "Developed in Germany from the Bullenbeisser and English Bulldog.",
    funFacts: [
      "Very playful and energetic",
      "Great with children",
      "Natural protectors",
      "Love to play"
    ],
    commonHealthIssues: [
      { issue: "Heart Disease", description: "Aortic stenosis", prevention: "Regular vet checkups" },
      { issue: "Cancer", description: "Higher risk than other breeds", prevention: "Regular vet checkups" }
    ],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "not-suitable",
      apartments: "not-suitable",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 25000, max: 50000, currency: "INR" },
    availability: "common",
    tags: ["playful", "energetic", "protective", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Cocker Spaniel",
    species: "dog",
    breed: "Cocker Spaniel",
    origin: "England",
    size: "medium",
    weight: { min: 12, max: 15, unit: "kg" },
    height: { min: 36, max: 41, unit: "cm" },
    lifespan: { min: 12, max: 15, unit: "years" },
    temperament: ["gentle", "affectionate", "intelligent", "loyal"],
    characteristics: {
      energy: "moderate",
      intelligence: "high",
      trainability: "easy",
      social: "very-social",
      grooming: "high",
      shedding: "moderate",
      barking: "moderate"
    },
    care: {
      exercise: "Daily walks and play",
      diet: "High-quality food",
      grooming: "Daily brushing, professional grooming",
      health: "Watch for ear infections",
      training: "Easy to train, eager to please"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500", isPrimary: true }
    ],
    description: "The Cocker Spaniel is a medium-sized dog known for its gentle nature and beautiful, silky coat.",
    history: "Developed in England as a hunting dog, now popular as a companion.",
    funFacts: [
      "Originally hunting dogs",
      "Very gentle and affectionate",
      "Requires regular grooming",
      "Great family dogs"
    ],
    commonHealthIssues: [
      { issue: "Ear Infections", description: "Due to floppy ears", prevention: "Regular ear cleaning" },
      { issue: "Eye Issues", description: "Progressive retinal atrophy", prevention: "Regular eye checkups" }
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
    tags: ["gentle", "affectionate", "long-haired", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  // More Cat Breeds
  {
    name: "Abyssinian Cat",
    species: "cat",
    breed: "Abyssinian Cat",
    origin: "Ethiopia",
    size: "medium",
    weight: { min: 3, max: 5, unit: "kg" },
    height: { min: 20, max: 25, unit: "cm" },
    lifespan: { min: 9, max: 15, unit: "years" },
    temperament: ["active", "intelligent", "playful", "curious"],
    characteristics: {
      energy: "high",
      intelligence: "high",
      trainability: "easy",
      social: "very-social",
      grooming: "minimal",
      shedding: "minimal",
      barking: "moderate"
    },
    care: {
      exercise: "Lots of play and mental stimulation",
      diet: "High-quality cat food",
      grooming: "Weekly brushing",
      health: "Generally healthy",
      training: "Very intelligent, can learn tricks"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500", isPrimary: true }
    ],
    description: "The Abyssinian Cat is an active, intelligent cat known for its ticked coat and playful nature.",
    history: "One of the oldest cat breeds, originating from Ethiopia (formerly Abyssinia).",
    funFacts: [
      "One of the oldest cat breeds",
      "Very active and playful",
      "Intelligent and curious",
      "Great climbers"
    ],
    commonHealthIssues: [
      { issue: "Kidney Issues", description: "Progressive retinal atrophy", prevention: "Regular health monitoring" },
      { issue: "Dental Issues", description: "Gum disease", prevention: "Regular dental care" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "not-suitable",
      apartments: "suitable",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 25000, max: 60000, currency: "INR" },
    availability: "uncommon",
    tags: ["active", "intelligent", "playful", "unique"],
    isIndianBreed: false,
    isPopular: false
  },
  {
    name: "Russian Blue",
    species: "cat",
    breed: "Russian Blue",
    origin: "Russia",
    size: "medium",
    weight: { min: 3, max: 5, unit: "kg" },
    height: { min: 20, max: 25, unit: "cm" },
    lifespan: { min: 15, max: 20, unit: "years" },
    temperament: ["gentle", "quiet", "intelligent", "reserved"],
    characteristics: {
      energy: "moderate",
      intelligence: "high",
      trainability: "easy",
      social: "moderate",
      grooming: "minimal",
      shedding: "minimal",
      barking: "quiet"
    },
    care: {
      exercise: "Interactive play and toys",
      diet: "High-quality cat food",
      grooming: "Weekly brushing",
      health: "Generally healthy",
      training: "Intelligent, can learn tricks"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500", isPrimary: true }
    ],
    description: "The Russian Blue is a gentle, quiet cat known for its beautiful blue-gray coat and green eyes.",
    history: "Originated in Russia, these cats have been popular for their beauty and gentle nature.",
    funFacts: [
      "Beautiful blue-gray coat",
      "Very gentle and quiet",
      "Intelligent and reserved",
      "Great for quiet households"
    ],
    commonHealthIssues: [
      { issue: "Obesity", description: "Tendency to gain weight", prevention: "Portion control, regular exercise" },
      { issue: "Dental Issues", description: "Gum disease", prevention: "Regular dental care" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 30000, max: 70000, currency: "INR" },
    availability: "uncommon",
    tags: ["gentle", "quiet", "beautiful", "unique"],
    isIndianBreed: false,
    isPopular: false
  },
  // More Bird Species
  {
    name: "Lovebird",
    species: "bird",
    breed: "Lovebird",
    origin: "Africa",
    size: "tiny",
    weight: { min: 0.04, max: 0.06, unit: "kg" },
    height: { min: 13, max: 17, unit: "cm" },
    lifespan: { min: 10, max: 15, unit: "years" },
    temperament: ["affectionate", "playful", "intelligent", "social"],
    characteristics: {
      energy: "high",
      intelligence: "high",
      trainability: "easy",
      social: "very-social",
      grooming: "minimal",
      shedding: "minimal",
      barking: "moderate"
    },
    care: {
      exercise: "Daily out-of-cage time",
      diet: "Seeds, pellets, fruits, vegetables",
      grooming: "Regular nail trimming",
      health: "Generally healthy",
      training: "Very trainable, can learn tricks"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500", isPrimary: true }
    ],
    description: "The Lovebird is a small, affectionate parrot known for its strong pair bonds and playful nature.",
    history: "Native to Africa, these birds are known for their monogamous relationships.",
    funFacts: [
      "Form strong pair bonds",
      "Very affectionate",
      "Can learn to talk",
      "Great companions"
    ],
    commonHealthIssues: [
      { issue: "Respiratory Issues", description: "Sensitive to fumes", prevention: "Avoid scented products" },
      { issue: "Feather Plucking", description: "Stress-related behavior", prevention: "Mental stimulation" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 2000, max: 8000, currency: "INR" },
    availability: "common",
    tags: ["affectionate", "playful", "social", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Zebra Finch",
    species: "bird",
    breed: "Zebra Finch",
    origin: "Australia",
    size: "tiny",
    weight: { min: 0.01, max: 0.02, unit: "kg" },
    height: { min: 10, max: 12, unit: "cm" },
    lifespan: { min: 5, max: 7, unit: "years" },
    temperament: ["active", "social", "cheerful", "vocal"],
    characteristics: {
      energy: "high",
      intelligence: "moderate",
      trainability: "moderate",
      social: "very-social",
      grooming: "minimal",
      shedding: "minimal",
      barking: "vocal"
    },
    care: {
      exercise: "Flight time in large cage",
      diet: "Seeds, pellets, fresh vegetables",
      grooming: "Regular nail trimming",
      health: "Generally healthy",
      training: "Can learn simple tricks"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500", isPrimary: true }
    ],
    description: "The Zebra Finch is a small, active bird known for its cheerful nature and beautiful markings.",
    history: "Native to Australia, these birds are popular for their hardiness and social nature.",
    funFacts: [
      "Very active and social",
      "Beautiful markings",
      "Great for beginners",
      "Love to sing"
    ],
    commonHealthIssues: [
      { issue: "Respiratory Issues", description: "Sensitive to fumes", prevention: "Avoid scented products" },
      { issue: "Obesity", description: "From overfeeding seeds", prevention: "Balanced diet" }
    ],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 500, max: 2000, currency: "INR" },
    availability: "common",
    tags: ["active", "social", "beginner", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  // More Fish Species
  {
    name: "Discus Fish",
    species: "fish",
    breed: "Discus Fish",
    origin: "South America",
    size: "medium",
    weight: { min: 0.2, max: 0.4, unit: "kg" },
    height: { min: 15, max: 20, unit: "cm" },
    lifespan: { min: 10, max: 15, unit: "years" },
    temperament: ["peaceful", "sensitive", "beautiful", "social"],
    characteristics: {
      energy: "moderate",
      intelligence: "moderate",
      trainability: "easy",
      social: "very-social",
      grooming: "minimal",
      shedding: "none",
      barking: "quiet"
    },
    care: {
      exercise: "Swimming space, school of 6+",
      diet: "High-quality pellets, live food",
      grooming: "Tank cleaning, water changes",
      health: "Sensitive to water quality",
      training: "Can learn feeding routines"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500", isPrimary: true }
    ],
    description: "The Discus Fish is a beautiful, sensitive fish known for its round shape and vibrant colors.",
    history: "Native to the Amazon River basin in South America.",
    funFacts: [
      "Very beautiful and colorful",
      "Sensitive to water quality",
      "Schooling fish",
      "Great centerpiece fish"
    ],
    commonHealthIssues: [
      { issue: "Water Quality Issues", description: "Sensitive to poor water quality", prevention: "Regular water changes" },
      { issue: "Ich", description: "Parasitic infection", prevention: "Quarantine new fish" }
    ],
    suitability: {
      families: "suitable",
      children: "not-suitable",
      seniors: "suitable",
      apartments: "suitable",
      firstTimeOwners: "not-suitable"
    },
    priceRange: { min: 2000, max: 10000, currency: "INR" },
    availability: "uncommon",
    tags: ["beautiful", "sensitive", "colorful", "unique"],
    isIndianBreed: false,
    isPopular: false
  },
  {
    name: "Oscar Fish",
    species: "fish",
    breed: "Oscar Fish",
    origin: "South America",
    size: "large",
    weight: { min: 0.5, max: 1, unit: "kg" },
    height: { min: 25, max: 35, unit: "cm" },
    lifespan: { min: 10, max: 18, unit: "years" },
    temperament: ["aggressive", "intelligent", "territorial", "beautiful"],
    characteristics: {
      energy: "moderate",
      intelligence: "high",
      trainability: "easy",
      social: "independent",
      grooming: "minimal",
      shedding: "none",
      barking: "quiet"
    },
    care: {
      exercise: "Large tank, hiding places",
      diet: "High-quality pellets, live food",
      grooming: "Tank cleaning, water changes",
      health: "Generally hardy",
      training: "Can learn to recognize owner"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500", isPrimary: true }
    ],
    description: "The Oscar Fish is a large, intelligent fish known for its personality and territorial nature.",
    history: "Native to the Amazon River basin in South America.",
    funFacts: [
      "Very intelligent",
      "Can recognize their owner",
      "Territorial and aggressive",
      "Large and beautiful"
    ],
    commonHealthIssues: [
      { issue: "Aggression", description: "Territorial behavior", prevention: "Large tank, hiding places" },
      { issue: "Ich", description: "Parasitic infection", prevention: "Quarantine new fish" }
    ],
    suitability: {
      families: "not-suitable",
      children: "not-suitable",
      seniors: "suitable",
      apartments: "suitable",
      firstTimeOwners: "not-suitable"
    },
    priceRange: { min: 500, max: 3000, currency: "INR" },
    availability: "common",
    tags: ["intelligent", "aggressive", "large", "unique"],
    isIndianBreed: false,
    isPopular: false
  },
  // Final additions to reach 50
  {
    name: "Pug",
    species: "dog",
    breed: "Pug",
    origin: "China",
    size: "small",
    weight: { min: 6, max: 8, unit: "kg" },
    height: { min: 25, max: 33, unit: "cm" },
    lifespan: { min: 12, max: 15, unit: "years" },
    temperament: ["charming", "loving", "playful", "gentle"],
    characteristics: {
      energy: "low",
      intelligence: "moderate",
      trainability: "moderate",
      social: "very-social",
      grooming: "moderate",
      shedding: "heavy",
      barking: "moderate"
    },
    care: {
      exercise: "Moderate exercise, avoid overheating",
      diet: "High-quality food, watch weight",
      grooming: "Weekly brushing, clean face folds",
      health: "Watch for breathing issues",
      training: "Gentle, consistent training"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=500", isPrimary: true }
    ],
    description: "The Pug is a small, charming dog known for its wrinkled face and loving personality.",
    history: "Originated in China, these dogs were favorites of Chinese emperors.",
    funFacts: [
      "Favorites of Chinese emperors",
      "Very charming and loving",
      "Can overheat easily",
      "Great with children"
    ],
    commonHealthIssues: [
      { issue: "Breathing Problems", description: "Due to flat face", prevention: "Avoid overheating" },
      { issue: "Eye Issues", description: "Protruding eyes", prevention: "Regular eye cleaning" }
    ],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 25000, max: 50000, currency: "INR" },
    availability: "common",
    tags: ["charming", "loving", "wrinkled", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Sphynx Cat",
    species: "cat",
    breed: "Sphynx Cat",
    origin: "Canada",
    size: "medium",
    weight: { min: 3, max: 5, unit: "kg" },
    height: { min: 20, max: 25, unit: "cm" },
    lifespan: { min: 8, max: 14, unit: "years" },
    temperament: ["affectionate", "energetic", "intelligent", "social"],
    characteristics: {
      energy: "high",
      intelligence: "high",
      trainability: "easy",
      social: "very-social",
      grooming: "high",
      shedding: "none",
      barking: "moderate"
    },
    care: {
      exercise: "Lots of play and mental stimulation",
      diet: "High-quality cat food",
      grooming: "Regular bathing, skin care",
      health: "Watch for skin issues",
      training: "Very intelligent, can learn tricks"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500", isPrimary: true }
    ],
    description: "The Sphynx Cat is a hairless cat known for its affectionate nature and unique appearance.",
    history: "Developed in Canada in the 1960s from a natural genetic mutation.",
    funFacts: [
      "Hairless cats",
      "Very affectionate",
      "Need regular bathing",
      "Love attention"
    ],
    commonHealthIssues: [
      { issue: "Skin Issues", description: "Due to lack of fur", prevention: "Regular bathing, skin care" },
      { issue: "Temperature Sensitivity", description: "Due to lack of fur", prevention: "Keep warm" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "suitable",
      apartments: "excellent",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 50000, max: 120000, currency: "INR" },
    availability: "rare",
    tags: ["hairless", "affectionate", "unique", "rare"],
    isIndianBreed: false,
    isRare: true
  },
  {
    name: "Conure",
    species: "bird",
    breed: "Sun Conure",
    origin: "South America",
    size: "small",
    weight: { min: 0.1, max: 0.12, unit: "kg" },
    height: { min: 28, max: 30, unit: "cm" },
    lifespan: { min: 15, max: 30, unit: "years" },
    temperament: ["playful", "intelligent", "vocal", "social"],
    characteristics: {
      energy: "high",
      intelligence: "high",
      trainability: "easy",
      social: "very-social",
      grooming: "minimal",
      shedding: "minimal",
      barking: "vocal"
    },
    care: {
      exercise: "Daily out-of-cage time",
      diet: "Pellets, seeds, fruits, vegetables",
      grooming: "Regular nail trimming",
      health: "Generally healthy",
      training: "Very trainable, can learn tricks"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500", isPrimary: true }
    ],
    description: "The Sun Conure is a colorful, intelligent parrot known for its playful nature and beautiful colors.",
    history: "Native to South America, these birds are popular for their beauty and intelligence.",
    funFacts: [
      "Very colorful and beautiful",
      "Intelligent and playful",
      "Can learn to talk",
      "Great companions"
    ],
    commonHealthIssues: [
      { issue: "Respiratory Issues", description: "Sensitive to fumes", prevention: "Avoid scented products" },
      { issue: "Feather Plucking", description: "Stress-related behavior", prevention: "Mental stimulation" }
    ],
    suitability: {
      families: "excellent",
      children: "suitable",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "suitable"
    },
    priceRange: { min: 15000, max: 40000, currency: "INR" },
    availability: "common",
    tags: ["colorful", "intelligent", "playful", "popular"],
    isIndianBreed: false,
    isPopular: true
  },
  {
    name: "Tetra",
    species: "fish",
    breed: "Cardinal Tetra",
    origin: "South America",
    size: "tiny",
    weight: { min: 0.005, max: 0.01, unit: "kg" },
    height: { min: 3, max: 4, unit: "cm" },
    lifespan: { min: 4, max: 6, unit: "years" },
    temperament: ["peaceful", "active", "schooling", "colorful"],
    characteristics: {
      energy: "high",
      intelligence: "moderate",
      trainability: "easy",
      social: "very-social",
      grooming: "minimal",
      shedding: "none",
      barking: "quiet"
    },
    care: {
      exercise: "Swimming space, school of 6+",
      diet: "Flakes, pellets, live food",
      grooming: "Tank cleaning, water changes",
      health: "Generally hardy",
      training: "Can learn feeding routines"
    },
    images: [
      { url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500", isPrimary: true }
    ],
    description: "The Cardinal Tetra is a small, colorful fish known for its bright red and blue stripes and schooling behavior.",
    history: "Native to the Amazon River basin in South America.",
    funFacts: [
      "Very colorful",
      "Schooling fish",
      "Great for community tanks",
      "Easy to care for"
    ],
    commonHealthIssues: [
      { issue: "Ich", description: "Parasitic infection", prevention: "Quarantine new fish" },
      { issue: "Neon Tetra Disease", description: "Parasitic infection", prevention: "Quarantine new fish" }
    ],
    suitability: {
      families: "excellent",
      children: "excellent",
      seniors: "excellent",
      apartments: "excellent",
      firstTimeOwners: "excellent"
    },
    priceRange: { min: 100, max: 300, currency: "INR" },
    availability: "common",
    tags: ["colorful", "schooling", "beginner", "popular"],
    isIndianBreed: false,
    isPopular: true
  }
];

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/paw-love');
    console.log('Connected to MongoDB');

    // Clear existing data
    await PetDictionary.deleteMany({});
    console.log('Cleared existing data');

    // Insert new data
    const result = await PetDictionary.insertMany(petData);
    console.log(`Successfully seeded ${result.length} pets`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
