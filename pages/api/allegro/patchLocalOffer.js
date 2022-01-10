import Auctions from "../../../model/allegroAuctions";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "PATCH") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      const readyData = req.body;
      await dbConnect();

      const ans = await Auctions.findByIdAndUpdate(readyData.auctionId, {
        ...(readyData.productId && { productId: readyData.productId }),
        ...(readyData.productId == null && { $unset: { productId: "" } }),
      });
      return res
        .status(200)
        .json({ mess: "Poprawnie zaktualizowano aukcję", data: ans });
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ mess: "Bład typu" });
  }
}
