import Auctions from "../../../model/allegroAuctions";
import axiosInstance, { allegroAxios } from "../../../app/lib/axiosInstance";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in

      try {
        const readyData = req.body.data;
        const tokenData = await axiosInstance.get("/api/settings/getSettings", {
          params: {
            code: "allegroAccessToken",
          },
          headers: {
            cookie: req.headers.cookie,
          },
        });
        const ans = await allegroAxios({
          method: "POST",
          url: `/sale/offers`,
          headers: {
            Authorization: `Bearer ${tokenData.data.allegroAccessToken.value}`,
            "Content-Type": "application/vnd.allegro.public.v1+json",
          },
          data: {
            //   publication: readyData.offer.publication,
            //   parameters: readyData.offer.parameters,
            name: readyData.offer.name,
            category: readyData.offer.category,
            delivery: readyData.offer.delivery,
            sellingMode: readyData.offer.sellingMode,
            images: readyData.offer.images.map((item) => {
              return { url: item.url };
            }),
          },
        });
        if (ans.data.id) {
        }

        const updateOffer = await Auctions.findByIdAndUpdate(
          readyData.offer._id,
          { id: ans.data.id }
        );
        return res.status(200).json("OK");
        //
        //   });
      } catch (err) {
        return res.status(401).json(err);
        //
      }
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  }
}
