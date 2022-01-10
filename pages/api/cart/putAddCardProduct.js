import User from "../../../model/users";
import Cart from "../../../model/carts";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    await dbConnect();

    const session = await getSession({ req });
    const readyData = req.body.params;

    const cartData = await (session
      ? Cart.findOne({ userId: session.user.uid })
      : readyData.cart
      ? Cart.findById(readyData.cart)
      : Cart.findOne({ _id: { $exists: false } }));
    let qty = 1;

    if (cartData) {
      const oldCart = cartData.cart.items;
      for (const obj of oldCart) {
        if (obj.productId.toString() === readyData.productId.toString()) {
          qty = obj.quantity + 1;
        }
      }
      const updatedCartItems = oldCart.filter((item) => {
        return item.productId.toString() !== readyData.productId.toString();
      });

      cartData.cart.items = [
        ...updatedCartItems,
        {
          productId: readyData.productId,
          quantity: qty,
        },
      ];
      const data = await cartData.save();
      return res
        .status(200)
        .json({ status: qty == 1 ? "NEW_ITEM" : "EXISTING_ITEM", items: data });
    } else {
      const newCart = new Cart({
        cart: {
          items: [
            {
              productId: readyData.productId,
              quantity: qty,
            },
          ],
        },
        userId: session ? session.user.uid : undefined,
      });
      const data = await newCart.save();
      return res.status(200).json({
        status: session ? "NEW_SESSION_CART" : "NEW_COOKIE_CART",
        items: data,
      });
    }
  }
}
