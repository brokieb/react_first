import Cart from "model/carts";
import Order from "model/orders";
import dbConnect from "app/lib/dbConnect";
import { getSession } from "next-auth/react";
import dayjs from "dayjs";
export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === "POST") {
    await dbConnect();
    const readyData = req.body.params;
    const cartData = await Cart.findById(readyData.cartId).populate([
      "cart.items.productId",
      "userId",
    ]);
    console.log(session, "@@@");
    let totalValue = 0;
    const order = new Order({
      user: {
        name: session.user.name,
        email: session.user.email,
        userId: session.user.uid,
      },
      products: cartData.cart.items.map((item) => {
        if (
          dayjs(item.productId.discount.discountUntil).format() >
          dayjs().format()
        ) {
          item.productId.price = (
            item.productId.price - item.productId.discount.discountValue
          ).toFixed(2);
        }
        totalValue += item.productId.price * item.quantity;
        return {
          productId: item.productId._id,
          productTitle: item.productId.title,
          productQty: item.quantity,
          productPrice: item.productId.price,
          productValue: item.productId.price * item.quantity,
        };
      }),
      get totalValue() {
        let discSum = 0;
        switch (cartData.discount.discountType) {
          case "PERCENT":
            discSum = totalValue / (cartData.discount.discountValue / 100 + 1);
            break;
          case "AMOUNT":
            discSum = totalValue - cartData.discount.discountValue;
            break;
          default:
            discSum = totalValue;
            break;
        }
        return discSum;
      },
      orderSource: "STORE",
      orderStatus: "NEW",
    });

    const newOrder = await order.save();
    await cartData.deleteOne();
    return res
      .status(200)
      .json({ mess: "Poprawnie utworzono zamówienie", id: newOrder._id });
  } else {
    return res.status(402).json({ mess: "Bład typu" });
  }
}
