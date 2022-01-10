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
      await dbConnect();
      // Signed in
      const readyData = req.query;
      const tokenData = await axiosInstance.get("/api/settings/getSettings", {
        params: {
          code: "allegroAccessToken",
        },
        headers: {
          cookie: req.headers.cookie,
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
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
}
