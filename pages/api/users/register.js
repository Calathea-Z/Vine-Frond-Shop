import dbConnect from "@/lib/mongoDBConnect";
import User from "@/mongoModels/User";
import bcrypt from "bcrypt";
import { signToken } from "@/utils/auth";

export default async function handler(req, res) {
	const { firstName, lastName, email, password } = req.body;

	//Encrypt the password
	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);

	await dbConnect();

	if (req.method === "POST") {
		const userExist = await User.findOne({ email: req.body.email });
		if (userExist) {
			return res.status(401).send({ message: "Email already exists" });
		}
		try {
			const user = await User.create({
				firstName,
				lastName,
				salt,
				email,
				password: hashedPassword,
			});
			await user.save();
			res.status(201).json({ success: true, data: user });

			const newUser = {
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				salt: salt,
				isAdmin: false,
				isWholesale: false,
			};

			const token = signToken(newUser);
			res.send({ ...user, token });
		} catch (error) {
			res.status(400).json({ success: false });
		}
	} else {
		res.status(400).json({ success: false });
	}
}
