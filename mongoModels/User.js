import mongoose from "mongoose";

delete mongoose.connection.models["User"];

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name."],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  salt: {
    type: String,
    required: [true],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isWholesale: {
    type: Boolean,
    default: false,
  },
  contactMethod: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  zipCode: {
    type: Number,
  },
  state: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
