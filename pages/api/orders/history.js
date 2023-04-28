import dbConnect from "@/lib/mongoDBConnect";
import { isAuth } from "@/utils/auth";
import UserOrder from "@/mongoModels/UserOrder";

export default async function handler(req, res) {
  const user = await isAuth({ req });
  if (!user) {
    return res.status(401).send({ message: 'Please sign In' })
  }
  await dbConnect();

  if (req.method === "GET") {
    const orders = await UserOrder.find({ user: user._id });
    await dbConnect.disconnect();
    res.send(orders)
  };
  };