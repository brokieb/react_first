import Order from "../../../model/orders";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === "GET" && session) {
    await dbConnect();

    const order = await Order.find({ "user.userId": session.user.uid }).sort({
      createdAt: "desc",
    });
    return res.status(200).json(order);
  } else {
    return res.status(405).json({ mess: "niedozwolone" });
  }
}
