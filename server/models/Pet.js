import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true }, // dog, cat, etc.
  breed: { type: String },
  age: { type: Number },
  gender: { type: String },
  size: { type: String },
  location: { type: String },
  description: { type: String },
  medicalHistory: { type: String },
  images: [{ type: String }], // array of image URLs
  isAdopted: { type: Boolean, default: false },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const Pet = mongoose.model("Pet", petSchema);
export default Pet;
