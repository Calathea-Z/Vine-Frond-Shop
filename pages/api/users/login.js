import dbConnect from "@/lib/mongoDBConnect";
import User from "@/mongoModels/User";
import { signToken } from "@/utils/auth";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = signToken({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          isWholesale: user.isWholesale,
        });
        res.status(200).json({
          // Change status to 200 for success
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          isWholesale: user.isWholesale,
          token,
        });
        console.log("Login Successful"); // Update log message to "Login Successful"
      } else {
        res.status(401).json({ message: "Invalid email or password" }); // Update error response
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" }); //Update error response
    }
  } else {
    res.status(400).json({ message: "Bad Request" }); //Update error response for invalid request method
  }
}
