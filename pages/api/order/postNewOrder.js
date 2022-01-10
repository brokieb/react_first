import Cart from "../../../model/carts";
import Order from "../../../model/orders";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";
import dayjs from "dayjs";
export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === "POST") {
    await dbConnect();
    const readyData = req.body.params;
    if (readyData.cartId) {
      const cartData = await Cart.findById(readyData.cartId).populate([
        "cart.items.productId",
        "userId",
      ]);
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
              discSum =
                totalValue / (cartData.discount.discountValue / 100 + 1);
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
      //create order manually
      try {
        const order = new Order({
          user: {
            name: readyData.user.name,
            email: readyData.user.email,
          },
          products: readyData.products,
          totalValue: readyData.totalValue, //!!!!!!!
          orderSource: readyData.orderSource,
          orderStatus: "PAID", //!!!!!!!
          foreignId: readyData.foreignId,
        });
        const newOrder = await order.save();
        return res.status(200).json({
          mess: "Poprawnie utworzono zamówienie",
          id: newOrder._id,
        });
      } catch (err) {
        return res.status(400).json({
          mess: "Nie udało się utworzyć wszystkich zamówień!",
          id: 0,
          code: "FOREIGN_PRODUCTS",
        });
      }
    }
  } else {
    return res.status(405).json({ mess: "Bład typu", code: "WRONG_METHOD" });
  }
}
