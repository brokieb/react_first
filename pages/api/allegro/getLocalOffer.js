import User from "model/users";
import Cart from "model/carts";
import Product from "model/product";
import Auctions from "model/allegroAuctions";
import dbConnect from "app/lib/dbConnect";
import { getSession } from "next-auth/react";
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import axiosInstance, { allegroAxios } from "app/lib/axiosInstance";
export default async function handler(req, res) {
  const session = await getSession({ req });
  await dbConnect();
  if (req.method === "GET") {
    const readyData = req.query;
    try {
      const auc = await Auctions.findOne({
        ...(readyData.foreignId && { id: readyData.foreignId }),
        ...(readyData.id && { id: readyData.id }),
      }).populate("productId");
      return res.status(200).json(auc);
    } catch (err) {
      console.log(err);
      return res.status(402).json({ err: ":(" });
    }
  } else {
    return res.status(402).json({ err: "WRONG METHOD" });
  }
}
