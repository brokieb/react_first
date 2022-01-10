import Credentials from "../../../model/credentials";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      try {
        const readyData = req.body.params;
        await dbConnect();
        const creds = await Credentials.findById(readyData.id);
        creds.usersLen = creds.users.length;
        const ans = await creds.save();
        return res
          .status(200)
          .json({ mess: "Poprawnie naprawiono konto :)", data: ans });
      } catch (error) {
        return res.status(400).json({ err: error });
      }
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
}
