import User from "../../../model/users";
import Cart from "../../../model/carts";
import Product from "../../../model/product";
import Auctions from "../../../model/allegroAuctions";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import axiosInstance, { allegroAxios } from "../../../app/lib/axiosInstance";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in

      await dbConnect();
      const readyData = req.query;
      try {
        const auc = await Auctions.findOne({
          ...(readyData.foreignId && { id: readyData.foreignId }),
          ...(readyData.id && { id: readyData.id }),
        }).populate("productId");
        return res.status(200).json(auc);
      } catch (err) {
        return res.status(405).json({ err: ":(" });
      }
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
}
