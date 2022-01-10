import Credentials from "../../../model/credentials";
import Orders from "../../../model/orders";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      await dbConnect();
      const readyData = req.query;

      const cred = await Credentials.find({
        ...(readyData._id && { _id: readyData._id }),
        ...(readyData.productId && { productId: readyData.productId }),
        ...(readyData.orderId && { "users.orderId": readyData.orderId }),
      }).populate(["productId", "users.orderId", "usersHistory.orderId"]);
      switch (req.query.mode) {
        case "SIBLINGS":
          const sibs = await Credentials.find({
            $and: [
              { productId: cred.productId },
              { _id: { $nin: [cred._id] } },
              {
                $expr: {
                  $lte: [
                    { $sum: ["$usersLen", req.query.users] },
                    "$usersMaxLen",
                  ],
                },
              },
            ],
          });
          return res.status(200).json(sibs);
        default:
          return res.status(200).json(cred);
      }
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    res.status(405).json({ err: "WRONG METHOD" });
  }
}
