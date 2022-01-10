import Discount from "../../../model/discount";
import Carts from "../../../model/carts";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      const readyData = req.query;
      await dbConnect();
      const code = await Discount.findOne({ code: readyData.code });
      if (code) {
        const cart = await Carts.findByIdAndUpdate(readyData.cart, {
          discount: {
            code: code.code,
            expiredIn: code.expiredIn,
            discountId: code._id,
            discountValue: code.value,
            discountType: code.type,
          },
        });
        return res.status(200).json({ data: code });
      } else {
        return res.status(200).json({ data: null });
      }
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ mess: "WRONG METHOD" });
  }
}
