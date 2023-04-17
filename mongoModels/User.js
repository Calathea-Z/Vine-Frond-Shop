import mongoose from "mongoose";
import bcrypt from 'bcrypt'

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
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isWholesale: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      // If the password field is not modified, skip password hashing
      return next();
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Set the hashed password to the password field
    this.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("User", userSchema)

export default User;