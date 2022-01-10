import Order from "../../../model/orders";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      const readyData = req.query;

      await dbConnect();
      const orders = await Order.find({
        ...(readyData.orderSource && { orderSource: readyData.orderSource }),
      })
        .sort({ createdAt: "desc" })
        .limit(readyData.limit && readyData.limit * 1);
      return res.status(200).json(orders);
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ mess: "WRONG METHOD" });
  }
}
