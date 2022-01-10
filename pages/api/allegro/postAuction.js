import bcrypt from "bcrypt";
import User from "../../../model/users";
import Auctions from "../../../model/allegroAuctions";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      const readyData = req.body;
      const auction = new Auctions(req.body.auction);
      await dbConnect();

      auction
        .save()
        .finally(() => {
          res.status(200).json({ mess: "Poprawnie dodano" });
        })
        .catch((err) => {
          return res.status(401).json({ mess: err });
        });
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    res.status(405).json({ err: "WRONG METHOD" });
  }
}
