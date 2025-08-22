import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["Pending", "Contacted", "Approved", "Rejected"], default: "Pending" },
}, { timestamps: true });

const AdoptionApplication = mongoose.model("AdoptionApplication", adoptionSchema);
export default AdoptionApplication;
