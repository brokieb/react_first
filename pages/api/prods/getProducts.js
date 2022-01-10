import Product from "../../../model/product";
import dbConnect from "../../../app/lib/dbConnect";
import dayjs from "dayjs";
export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await dbConnect();

      const prods = await Product.find({
        $and: [
          { _id: req.query._id ? req.query._id : { $exists: true } },
          { "settings.active": true },
        ],
      });
      // if(req.query._id){
      // }else{
      // 	const prods = await Product.find({active:true});
      // }
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
    } catch (err) {
      res.status(503);
    }
  } else {
    return res.status(400).json({ err: "not geet" });
  }
}
