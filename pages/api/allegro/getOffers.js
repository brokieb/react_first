import Auctions from "../../../model/allegroAuctions";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";
import axiosInstance, { allegroAxios } from "../../../app/lib/axiosInstance";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      await dbConnect();
      const readyData = req.query;

      const tokenData = await axiosInstance.get("/api/settings/getSettings", {
        params: {
          code: "allegroAccessToken",
        },
        headers: {
          cookie: req.headers.cookie,
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
        //
      }

      const notIn = await Auctions.find({ id: { $nin: ids } });
      arr.push(...notIn);
      return res.status(200).json(arr);
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
}
