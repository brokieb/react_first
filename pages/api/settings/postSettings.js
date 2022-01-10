import Settings from "../../../model/settings";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      await dbConnect();
      const readyData = req.body;
      const setting = new Settings({
        code: "test",
        value: "test2",
      });

      const newSetting = await setting.save();
      return res.status(200).json({ mess: "Poprawnie utworzono zamówienie" });
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ mess: "WRONG METHOD" });
  }
}
