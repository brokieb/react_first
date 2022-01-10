import Cart from "../../../model/carts";
import dbConnect from "../../../app/lib/dbConnect";
export default async function handler(req, res) {
  if (req.method === "PUT") {
    const readyData = req.body;
    await dbConnect();
    const cartData = await Cart.findOne({
      "cart.items._id": readyData.id,
    }).populate("cart.items.productId");
    cartData.cart.items = cartData.cart.items.filter((item) => {
      if (item._id == readyData.id) {
        let remove = true;
        switch (readyData.mode) {
          case "minus":
            if (item.quantity > 1) {
              remove = false;
              item.quantity = item.quantity - 1;
            }
            break;
          case "plus":
            remove = false;
            item.quantity = item.quantity + 1;
            break;
          case "remove":
            remove = true;
            break;
        }
        if (remove) {
          return false;
        }
      }
      return true;
    });
    await cartData.save();
    return res.status(200).json({ status: "OK", cart: cartData });
  }
}
