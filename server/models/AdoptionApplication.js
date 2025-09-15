import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["Pending", "Contacted", "Approved", "Rejected"], default: "Pending" },
  applicant: {
    // Personal Information
    fullName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    
    // Living Situation
    livingSituation: String,
    homeType: String,
    hasYard: String,
    yardFenced: String,
    hasOtherPets: String,
    otherPetsDetails: String,
    hasChildren: String,
    childrenAges: String,
    
    // Experience & Care
    petExperience: String,
    dailyTimeAvailable: String,
    exercisePlan: String,
    veterinaryCare: String,
    emergencyPlan: String,
    
    // Adoption Specific
    adoptionReason: String,
    petNamePreference: String,
    specialNeeds: String,
    additionalInfo: String,
    
    // References
    reference1Name: String,
    reference1Phone: String,
    reference1Relationship: String,
    reference2Name: String,
    reference2Phone: String,
    reference2Relationship: String,
    
    // Agreement
    agreeToTerms: Boolean,
    agreeToHomeVisit: Boolean,
    agreeToFollowUp: Boolean,
    
    applicationDate: Date
  },
  notes: String, // Shelter notes
}, { timestamps: true });

const AdoptionApplication = mongoose.model("AdoptionApplication", adoptionSchema);
export default AdoptionApplication;
