import dbConnect from "@/lib/mongoDBConnect";
import Order from "@/mongoModels/Order";
import { isAuth } from "@/utils/auth";

export default async function handler(req, res) {
  await dbConnect();
  
  if (req.method === "POST") {
    const user = isAuth(req);
    
    // Guest checkout
    if (!user) {
      try {
        const order = await Order.create({
          createdAt: new Date().toISOString(),
          ...req.body,
          userName: "Guest",
          user: null,
        });
        res.status(201).send(order._id);
      } catch (error) {
        res.status(400).send(error);
      }
    } 
    // Registered user checkout
    else {
      try {
        const order = await Order.create({
          createdAt: new Date().toISOString(),
          ...req.body,
          userFirstName: user.firstName,
          userLastName: user.lastName,
          user: user._id,
        });
        res.status(201).send(order._id);
      } catch (error) {
        res.status(400).send(error);
      }
    }
  }
}