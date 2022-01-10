import Product from "../../../model/product";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      const readyData = req.body.params;
      await dbConnect();

      const prod = await Product.findById(readyData.id);
      if (readyData.title) {
        prod.title = readyData.title;
      }
      if (readyData.sku) {
        prod.SKU = readyData.sku;
      }
      if (readyData.imageUrl) {
        prod.imageUrl = readyData.imageUrl;
      }
      if (readyData.price) {
        prod.price = readyData.price;
      }
      if (readyData.shortDescription) {
        prod.shortDescription = readyData.shortDescription;
      }
      if (readyData.description) {
        prod.description = readyData.description;
      }
      if (readyData.maxUsers) {
        prod.settings.usersPerAccount = readyData.maxUsers;
      }
      if (readyData.newStatus) {
        prod.settings.active = readyData.newStatus;
      }
      if (readyData.auctionId) {
        prod.auctionId = readyData.auctionId;
      }
      if (readyData.auctionId == null) {
        prod.auctionId = undefined;
      }

      const result = await prod.save();

      return res
        .status(200)
        .json({ mess: "Poprawnie zedytowano produkt", data: result });
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
}
