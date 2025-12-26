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
  images: {
    type: [String],
    default: [],
  }, // array of image URLs / data URIs
  isAdopted: { type: Boolean, default: false },
  // Listing type and pricing
  listingType: { 
    type: String, 
    enum: ['adoption', 'sale'], 
    default: 'adoption' 
  },
  price: { 
    type: Number, 
    required: function() { return this.listingType === 'sale'; },
    min: 0 
  },
  isNegotiable: { 
    type: Boolean, 
    default: function() { return this.listingType === 'sale'; }
  },
  currency: { 
    type: String, 
    default: 'USD',
    required: function() { return this.listingType === 'sale'; }
  },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

petSchema.virtual('imageUrls').get(function () {
  return this.images || [];
});

const Pet = mongoose.model("Pet", petSchema);
export default Pet;
