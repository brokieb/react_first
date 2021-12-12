import User from "model/users";
import Product from "model/product";
import dbConnect from "app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  if (req.method === "GET") {
    await dbConnect();
    const user = await User.findById(req.body.uid);
    return res.status(200).json(user);
  } else {
    return res.status(402).json({ err: "WRONG METHOD" });
  }
};
