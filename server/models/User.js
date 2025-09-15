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
    required: function() {
      return !this.isGoogleUser;
    },
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  picture: {
    type: String,
  },
  isShelter: {
    type: Boolean,
    default: false, // Only super-admin sets true manually
  },
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
