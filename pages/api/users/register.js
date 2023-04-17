import dbConnect from "@/lib/mongoDBConnect";
import User from "@/mongoModels/User";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { firstName, lastName, email, password } = req.body;

  //Encrypt the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await dbConnect();

  if (req.method === "POST") {
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });
      await user.save();
      console.log("Registration Successful");
      res.status(201).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }

  const userId = data
}
