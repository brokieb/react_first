import Settings from "../../../model/settings";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      await dbConnect();
      const readyData = req.body.data;
      for (const data of readyData) {
        // for (const data in datas) {
        //
        await Settings.findOneAndUpdate(
          { code: data.code },
          { value: data.value }
        );
        // }
      }

      return res.status(200).json({ mess: "Poprawnie zapisano" });
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
}
