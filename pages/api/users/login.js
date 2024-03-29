import dbConnect from "@/lib/mongoDBConnect";
import User from "@/mongoModels/User";
import { signToken } from "@/utils/auth";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
	await dbConnect();
	if (req.method === "POST") {
		try {
			const user = await User.findOne({ email: req.body.email });
			if (user && user.password && user.salt) {
				const isPasswordValid = bcrypt.compareSync(
					req.body.password,
					user.password
				);

				if (isPasswordValid) {
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
						shippingContactEmail: user.shippingContactEmail,
						firstNameShipping: user.firstNameShipping,
						lastNameShipping: user.lastNameShipping,
						address: user.address,
						city: user.city,
						zipCode: user.zipCode,
						usState: user.usState,
						token,
					});
				} else {
					res.status(401).json({ message: "Invalid email or password" });
				}
			} else {
				res.status(401).json({ message: "Invalid email or password" });
			}
		} catch (error) {
			res.status(500).json({ message: "Server error" });
		}
	} else {
		res.status(400).json({ message: "Bad Request" });
	}
}
