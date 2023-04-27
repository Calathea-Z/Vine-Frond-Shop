import dbConnect from "@/lib/mongoDBConnect";
import UserOrder from "@/mongoModels/UserOrder";
import GuestOrder from "@/mongoModels/GuestOrder";
import { isAuth } from "@/utils/auth";

export default async function handler(req, res) {
  await dbConnect();
  
  if (req.method === "POST") {
    const user = await isAuth(req);
    console.log("User", user)
    
    // Guest checkout
    if (user === true) {
      try {
        console.log("LOGGED IN USER HIT", user)
        const userOrder = await UserOrder.create({
          ...req.body,
          user: user && user._id,
        });
        res.status(201).send(userOrder._id);
      } catch (error) {
        res.status(400).send(error);
      }
    } 
    // Registered user checkout
    else {
      console.log(" GUEST HIT", user)
      try {
        const guestOrder = await GuestOrder.create({
          ...req.body,
        });
        res.status(201).send(guestOrder._id);
      } catch (error) {
        res.status(400).send(error);
      }
      
    }
  }
}