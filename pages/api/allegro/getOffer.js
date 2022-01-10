import Auctions from "../../../model/allegroAuctions";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";
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
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
}
