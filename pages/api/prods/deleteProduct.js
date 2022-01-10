import dbConnect from "../../../app/lib/dbConnect";
import users from "../../../model/users";
import carts from "../../../model/carts";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in

      await dbConnect();
      // const prod = await Product.findByIdAndDelete(req.query.id);
      //
      const usersArray = await users.find({
        "cart.items.productId": req.query.id,
      });
      for (const user of usersArray) {
        user.cart.items = user.cart.items.filter((item) => {
          return item.productId != req.query.id;
        });
        await user.save();
      }

      const cartsArray = await carts.find({
        "cart.items.productId": req.query.id,
      });
      for (const cartData of cartsArray) {
        cartData.cart.items = cartData.cart.items.filter((item) => {
          return item.productId != req.query.id;
        });
        await cartData.save();
      }

      return res.status(200).json({ ans: "OK" });
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
}
