import Product from "../../../model/product";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      const readyData = req.body.params;
      await dbConnect();

      const prod = new Product({
        title: readyData.title,
        SKU: readyData.sku,
        imageUrl: readyData.imageUrl,
        price: readyData.price,
        shortDescription: readyData.shortDescription,
        description: readyData.description,
        "settings.usersPerAccount": readyData.maxUsers,
      });

      const result = await prod.save();

      return res.status(201).json({ mess: "Poprawnie dodano produkt" });
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
}
