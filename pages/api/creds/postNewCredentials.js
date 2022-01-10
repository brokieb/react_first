import Credentials from "../../../model/credentials";
import Product from "../../../model/product";
import dbConnect from "../../../app/lib/dbConnect";
import mongoose from "mongoose";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      const readyData = req.body.params;
      await dbConnect();

      const cred = new Credentials({
        productId: new mongoose.Types.ObjectId(readyData.productId),
        email: readyData.email,
        password: readyData.password,
        expiredIn: readyData.expiredIn,
        comment: readyData.comment,
        active: readyData.active,
        usersMaxLen: readyData.usersMaxLen,
      });
      const ans = await cred.save();
      await Product.findByIdAndUpdate(ans.productId, {
        $push: { credentials: { credentialsId: ans._id } },
      });
      return res.status(200).json({ mess: "Poprawnie dodano produkt" });
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    res.status(405).json({ err: "WRONG METHOD" });
  }
}
