import Order from "model/orders";
import dbConnect from "app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === "GET") {
    const readyData = req.query;
    await dbConnect();

    const order = await Order.findById(readyData.orderId);
    return res.status(200).json(order);
  } else {
    return res.status(402).json({ mess: "niedozwolone" });
  }
}
