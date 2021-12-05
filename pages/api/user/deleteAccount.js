import User from "model/users";
import Product from "model/product";
import dbConnect from "app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  if (req.method === "DELETE") {
    const session = await getSession({ req });
    await dbConnect();
    const user = await User.findByIdAndDelete(session.user.uid);
    return res.status(200).json({ code: "ok" });
  } else {
    return res.status(402).json({ err: "WRONG METHOD" });
  }
};
