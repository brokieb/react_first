import bcrypt from "bcrypt";
import User from "model/users";
import Auctions from "model/allegroAuctions";
import dbConnect from "app/lib/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
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
  }
}
