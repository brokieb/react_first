import Auctions from "model/allegroAuctions";
import dbConnect from "app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === "PATCH") {
    const readyData = req.body;
    await dbConnect();
    console.log(readyData);
    const ans = await Auctions.findByIdAndUpdate(readyData.auctionId, {
      ...(readyData.productId && { productId: readyData.productId }),
      ...(readyData.productId == null && { $unset: { productId: "" } }),
    });
    return res
      .status(200)
      .json({ mess: "Poprawnie zaktualizowano aukcję", data: ans });
  } else {
    return res.status(402).json({ mess: "Bład typu" });
  }
}
