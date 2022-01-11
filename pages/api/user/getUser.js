import User from "../../../model/users";
import Product from "../../../model/product";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (session) {
      // Signed in
      console.l;
      await dbConnect();
      const user = await User.findById(session.user.uid);
      return res.status(200).json(user);
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
};
