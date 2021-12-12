import bcrypt from "bcrypt";
import User from "model/users";
import Auctions from "model/allegroAuctions";
import dbConnect from "app/lib/dbConnect";
import axiosInstance, { allegroAxios } from "app/lib/axiosInstance";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const readyData = req.body.data;
      const tokenData = await axiosInstance.get("/api/settings/getSettings", {
        params: {
          code: "allegroAccessToken",
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
      console.log(ans.data.id, "@@@");
      const updateOffer = await Auctions.findByIdAndUpdate(
        readyData.offer._id,
        { id: ans.data.id }
      );
      return res.status(200).json("OK");
      //   console.log(ans, "@@@").catch((err) => {
      //   });
    } catch (err) {
      return res.status(401).json(err);
      //
    }
  }
}
