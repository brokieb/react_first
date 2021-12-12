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
    const category = await allegroAxios.get(
      `/sale/categories/${readyData.categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.data.allegroAccessToken.value}`,
          "Content-Type": "application/vnd.allegro.public.v1+json",
        },
      }
    );

    return res.status(200).json(category.data);
  } else {
    return res.status(402).json({ err: "WRONG METHOD" });
  }
}
