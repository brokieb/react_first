import Order from "../../../model/orders";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (session) {
      // Signed in
      const session = await getSession({ req });
      const readyData = req.query;
      await dbConnect();

      const order = await Order.findOne({
        $and: [{ "user.userId": session.user.uid }, { _id: readyData.orderId }],
      });
      return res.status(200).json(order);
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ mess: "WRONG METHOD" });
  }
}
