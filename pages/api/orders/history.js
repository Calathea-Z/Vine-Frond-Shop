import dbConnect from "@/lib/mongoDBConnect";
import { isAuth } from "@/utils/auth";
import UserOrder from "@/mongoModels/UserOrder";

export default async function handler(req, res) {
	await dbConnect();
	if (req.method === "GET") {
		const user = await isAuth(req);
		if (!user) {
			return res.status(401).send({ message: "Please sign In" });
		}
		try {
			const orders = await UserOrder.find({ user: user._id });
			res.status(201).send(orders);
		} catch (error) {
			res.status(400).send(error);
		}
	}
}
