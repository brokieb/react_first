import Order from "../../../model/orders";
import Credentials from "../../../model/credentials";
import Product from "../../../model/product";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";
import dayjs from "dayjs";
export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      await dbConnect();

      const orders = await Order.find({
        $or: [{ orderStatus: "PAID" }, { orderStatus: "IN_PROGRESS" }],
      }).select("products updatedAt");
      //
      let noAccount = 0;
      let finished = 0;
      for (const order of orders) {
        order.orderStatus = "IN_PROGRESS";
        for (const product of order.products) {
          //WSZYSTKIE PRODUKTY KTÓRE SĄ DO ZREALIZOWANIA
          if (
            product.productStatus == "NEW" ||
            product.productStatus == "IN_PROGRESS"
          ) {
            product.productStatus = "IN_PROGRESS";
            await order.save();
            const prod = await Product.findOne({
              _id: product.productId,
            }).select("settings");
            const creds = await Credentials.findOne({
              $and: [
                { productId: product.productId },
                { $expr: { $lt: ["$usersLen", "$usersMaxLen"] } },
                { active: true },
              ],
            });
            if (creds) {
              creds.users = [
                ...creds.users,
                {
                  orderId: order._id,
                  profileName: null,
                  expiredIn: dayjs().add(product.productQty, "month").format(),
                },
              ];
              creds.usersLen = creds.usersLen + 1;
              product.productStatus = "FINISHED";
              await order.save();
              await creds.save();
              finished = finished + 1;
            } else {
              noAccount = noAccount + 1;
            }
          }
        }
        if (noAccount == 0) {
          order.orderStatus = "FINISHED";
          await order.save();
        }
      }

      if (finished == noAccount) {
        return res
          .status(200)
          .json({ ans: "Zrealizowano wszystkie zamówienia " });
      } else {
        return res
          .status(200)
          .json({ ans: "Niektóre zamówienia nie zostały zrealizowane!! " });
      }
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ mess: "WRONG METHOD" });
  }
}
