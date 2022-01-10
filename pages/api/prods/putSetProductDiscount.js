import Product from "../../../model/product";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      const readyData = req.body.params;
      await dbConnect();
      const prod = await Product.findById(readyData.id);
      if (readyData.discountValue > 0) {
        prod.discount = {
          discountValue: readyData.discountValue,
          discountUntil: readyData.discountUntil,
        };
      } else {
        prod.discount = {};
      }
      await prod.save();

      return res.status(200).json({ mess: "OK" });
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
}
