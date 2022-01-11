import dbConnect from "../../../app/lib/dbConnect";
import dayjs from "dayjs";
const qs = require("qs");
import { getSession } from "next-auth/react";
import axiosInstance, {
  allegroAxiosAuth,
} from "../../../app/lib/axiosInstance";
export default async function handler(req, res) {
  if (req.method === "PUT") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in

      return new Promise((resolve, reject) => {
        dbConnect();
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
            const data = axiosInstance
              .put(
                "/api/settings/putEditSettings",
                {
                  data: [
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
                      value: dayjs()
                        .add(ans.data.expires_in, "second")
                        .format(),
                    },
                  ],
                },
                {
                  headers: {
                    cookie: req.headers.cookie,
                  },
                }
              )
              .catch((err) => {
                //
              });
            return data;
          })
          .finally((e) => {
            res.status(200).end();
          })
          .catch((err) => {
            res.status(400).end();
          });
      });
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    res.status(401).json({ err: "NOT AUTHORIZED" });
  }
}
