import Order from "model/orders";
import dbConnect from "app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const readyData = req.query;
    console.log(readyData, "<<<<");
    await dbConnect();
    const orders = await Order.find({
      ...(readyData.orderSource && { orderSource: readyData.orderSource }),
    })
      .sort({ createdAt: "desc" })
      .limit(readyData.limit && readyData.limit * 1);
    return res.status(200).json(orders);
  } else {
    return res.status(400).json({ mess: "niedozwolone" });
  }
}
