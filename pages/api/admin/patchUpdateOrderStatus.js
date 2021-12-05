import Cart from "model/carts";
import Order from "model/orders";
import dbConnect from "app/lib/dbConnect";
import { getSession } from "next-auth/react";
import dayjs from "dayjs";
export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === "PATCH") {
    const readyData = req.body;
    if (
      ["NEW", "NOT-PAID", "PAID", "IN_PROGRESS", "FINISHED"].includes(
        readyData.orderStatus
      )
    ) {
      await dbConnect();
      const ans = await Order.findByIdAndUpdate(readyData.orderId, {
        orderStatus: readyData.orderStatus,
      });
      // const cartData = await Cart.findById(readyData.cartId).populate([
      //   "cart.items.productId",
      //   "userId",
      // ]);

      // const newOrder = await order.save();
      // await cartData.deleteOne();
      return res
        .status(200)
        .json({ mess: "Poprawnie utworzono zamówienie", data: ans });
    } else {
      return res.status(400).json({ mess: "BŁĘDNE DANEw" });
    }
  } else {
    return res.status(402).json({ mess: "Bład typu" });
  }
}
