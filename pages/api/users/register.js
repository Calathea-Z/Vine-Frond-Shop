import dbConnect from "@/lib/mongoDBConnect";
import User from "@/mongoModels/User";
import bcrypt from "bcrypt";


export default async function handler(req, res) {
  const { firstName, lastName, email, password } = req.body;

  //Encrypt the password
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  await dbConnect();

  if (req.method === "POST") {
    try {
      const user = await User.create({
        firstName,
        lastName,
        salt,
        email,
        password: hashedPassword,
      });
      await user.save();
      console.log("Registration Successful");
      res.status(201).json({ success: true, data: user });
      
      const newUser = {
        _id: data._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        salt: salt,
        isAdmin: false, 
        isWholesale: false,
      }

      const token = signToken(newUser);
      res.send({...user, token})
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
