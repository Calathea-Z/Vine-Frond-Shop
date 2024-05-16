import dbConnect from "@/lib/mongoDBConnect";
import { isAuth } from "@/utils/auth";
import UserOrder from "@/mongoModels/UserOrder";
import GuestOrder from "@/mongoModels/GuestOrder";

export default async function handler(req, res) {
	await dbConnect();

	if (req.method === "GET") {
		const user = await isAuth(req);
		// registered user
		if (user) {
			try {
				const userOrder = await UserOrder.findById(req.query.id);
				res.status(201).send(userOrder);
			} catch (error) {
				res.status(400).send(error);
			}
		}
		// Guest user
		else {
			try {
				const guestOrder = await GuestOrder.findById(req.query.id);
				res.status(201).send(guestOrder);
			} catch (error) {
				res.status(400).send(error);
			}
		}
	}

	// Add a default response to handle any unexpected scenarios
	res.status(404).send("Not Found");
}
