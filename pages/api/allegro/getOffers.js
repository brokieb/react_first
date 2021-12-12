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
    let ids = [];
    let arr = [];
    try {
      const itemsAllegro = await allegroAxios.get("/sale/offers", {
        headers: {
          Authorization: `Bearer ${tokenData.data.allegroAccessToken.value}`,
          Accept: "application/vnd.allegro.public.v1+json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      for (const item of itemsAllegro.data.offers) {
        const data = await Auctions.findOne({ id: item.id });
        item.source = data ? "SYNC" : "REMOTE";
        ids.push(item.id);
        arr.push(item);
      }
    } catch (err) {
      // console.log(err, "<<<");
    }

    const notIn = await Auctions.find({ id: { $nin: ids } });
    arr.push(...notIn);
    return res.status(200).json(arr);
  } else {
    return res.status(402).json({ err: "WRONG METHOD" });
  }
}
