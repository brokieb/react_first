import Settings from "../../../model/settings";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      const readyData = req.query;
      await dbConnect();
      let settings = [];
      if (readyData.code) {
        settings = await Settings.find({
          code: readyData.code,
        });
      } else if (readyData.codes) {
        settings = await Settings.find({
          code: { $in: JSON.parse(readyData.codes) },
        });
      } else {
        settings = await Settings.find();
      }
      // //
      let arr = {};
      for (const item of settings) {
        arr = {
          ...arr,
          [item.code]: {
            value: item.value,
            title: item.title,
          },
        };
      }
      return res.status(200).json(arr);
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
}
