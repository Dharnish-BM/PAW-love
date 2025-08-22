import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  isShelter: {
    type: Boolean,
    default: false, // Only super-admin sets true manually
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
