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

        const creds = await Credentials.findOne({
          "users._id": { $in: readyData.users },
        });
        const usersToMoveCount = readyData.users.length;

        const usersToMove = creds.users.filter((item) => {
          return readyData.users.includes(item._id.toString());
        });
        creds.users = creds.users.filter((item) => {
          return !readyData.users.includes(item._id.toString());
        });

        const newAcc = await Credentials.findOne({ _id: readyData.newId });
        const testArra = [];
        testArra.push(...usersToMove);
        testArra.push(...newAcc.users);
        newAcc.users = testArra;

        creds.usersLen = creds.usersLen - usersToMoveCount;
        newAcc.usersLen = newAcc.usersLen + usersToMoveCount;

        const old = await creds.save();
        const ans = await newAcc.save();
        return res.status(200).json({
          mess: "Poprawnie zaktualizowano objekt z danymi logowania :)",
          data: newAcc,
        });
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
