import User from "model/users";
import Cart from "model/carts";
import Product from "model/product";
import dbConnect from "app/lib/dbConnect";
import { faBreadSlice } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
const qs = require("qs");
import axiosInstance, { allegroAxiosAuth } from "app/lib/axiosInstance";
export default async function handler(req, res) {
  return new Promise((resolve, reject) => {
    dbConnect();
    if (req.method === "PUT") {
      const readyData = req.body;

      const ans = allegroAxiosAuth({
        method: "POST",
        url: "/auth/oauth/token",
        data: qs.stringify({
          code: readyData.accessCode,
          redirect_uri: process.env.ADDRESS + "/o/allegro",
          grant_type: "authorization_code",
        }),
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.ALLEGRO_ID + ":" + process.env.ALLEGRO_SECRET
            ).toString("base64"),
        },
      })
        .then((ans) => {
          const data = axiosInstance.put("/api/settings/putEditSettings", [
            {
              code: "allegroAccessToken",
              value: ans.data.access_token,
            },
            {
              code: "allegroRefreshToken",
              value: ans.data.refresh_token,
            },
            {
              code: "allegroExpiredIn",
              value: dayjs().add(ans.data.expires_in, "second").format(),
            },
          ]);
          return data;
        })
        .finally(() => {
          res.status(200).end();
          return resolve();
        })
        .catch((err) => {
          res.status(400).end();
          return resolve();
        });
    } else {
      res.status(401).end();
      return resolve();
    }
  });
}
