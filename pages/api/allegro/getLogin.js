import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";
import dayjs from "dayjs";
import axiosInstance, { allegroAxios } from "../../../app/lib/axiosInstance";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      await dbConnect();

      const loginLinkParams = {
        response_type: "code",
        client_id: process.env.ALLEGRO_ID,
        redirect_uri: process.env.ADDRESS + "/o/allegro",
      };
      const tokenData = await axiosInstance.get("/api/settings/getSettings", {
        params: {
          codes: JSON.stringify(["allegroExpiredIn", "allegroAccessToken"]),
        },
        headers: {
          cookie: req.headers.cookie,
        },
        headers: {
          cookie: req.headers.cookie,
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
        return res.status(401).json(loginLinkParams);
      }
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json("HTTP request not allowed");
  }
}
