import Product from "../../../model/product";
import Credentials from "../../../model/credentials";
import dbConnect from "../../../app/lib/dbConnect";
import dayjs from "dayjs";
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      await dbConnect();

      const prods = await Product.find();
      let ans = [];
      prods.forEach((prod) => {
        if (dayjs(prod.discount.discountUntil).format() > dayjs().format()) {
          ans.push({
            ...prod._doc,
            oldPrice: prod.price,
            price: (prod.price - prod.discount.discountValue).toFixed(2),
          });
        } else {
          ans.push(prod);
        }
      });

      return res.status(200).json(req.query._id ? ans[0] : ans);
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(400).json({ err: "not geet" });
  }
}
