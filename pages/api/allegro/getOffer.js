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
    const tokenData = await axiosInstance.get("/api/settings/getSettings", {
      params: {
        code: "allegroAccessToken",
      },
    });
    if (readyData.offerId) {
      try {
        const auc = await allegroAxios.get(
          `/sale/offers/${readyData.offerId}`,
          {
            headers: {
              Authorization: `Bearer ${tokenData.data.allegroAccessToken.value}`,
              Accept: "application/vnd.allegro.public.v1+json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        return res.status(200).json(auc.data);
      } catch (err) {
        if (err.response.code != 403) {
          return res.status(400);
        } else {
          return res.status(200);
        }
      }
    } else if (readyData._id) {
      const auc = await Auctions.findById(readyData._id);
      return res.status(200).json(auc);
    }
  } else {
    return res.status(402).json({ err: "WRONG METHOD" });
  }
}
