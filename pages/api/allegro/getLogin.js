import User from "model/users";
import Cart from "model/carts";
import Product from "model/product";
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

    const loginLinkParams = {
      response_type: "code",
      client_id: process.env.ALLEGRO_ID,
      redirect_uri: process.env.ADDRESS + "/o/allegro",
    };
    const tokenData = await axiosInstance.get("/api/settings/getSettings", {
      params: {
        codes: JSON.stringify([
          "allegroExpiredIn",
          "allegroAccessToken",
          "qqqq",
        ]),
      },
    });
    if (dayjs(tokenData.data.allegroExpiredIn.value) > dayjs()) {
      const ans = await allegroAxios
        .get("/me", {
          headers: {
            Authorization: `Bearer ${tokenData.data.allegroAccessToken.value}`,
            Accept: "application/vnd.allegro.public.v1+json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
        .then((ans) => {
          if (ans.status == 200) {
            return res.status(200).json(ans.data);
          }
        })
        .catch((err) => {
          return res.status(401).json(loginLinkParams);
        });
    } else {
      return res.status(400).json(loginLinkParams);
    }
  } else {
    return res.status(402).json({ err: "WRONG METHOD" });
  }
}
