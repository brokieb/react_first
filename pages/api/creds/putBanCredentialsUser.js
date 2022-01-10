import Credentials from "../../../model/credentials";
import dbConnect from "../../../app/lib/dbConnect";
import dayjs from "dayjs";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      const readyData = req.body.params;
      await dbConnect();

      const creds = await Credentials.findOne({
        "users._id": { $in: readyData.users },
      });
      const credId = creds._id;
      const usersToMoveCount = readyData.users.length;
      const usersToMove = creds.users.filter((item) => {
        return readyData.users.includes(item._id.toString());
      });
      creds.users = creds.users.filter((item) => {
        return !readyData.users.includes(item._id.toString());
      });
      creds.usersHistory.push(
        ...usersToMove.map((item) => {
          return {
            orderId: item.orderId,
            profileName: item.profileName,
            expiredIn: dayjs(item.expiredIn).format(),
            addedTime: dayjs().format(),
            status: "BANNED",
          };
        })
      );
      creds.usersLen = creds.usersLen - usersToMoveCount;

      const old = await creds.save();

      const response = await Credentials.findById(credId).populate([
        "productId",
        "users.orderId",
        "usersHistory.orderId",
      ]);
      return res.status(200).json({
        mess: "Poprawnie zaktualizowano objekt z danymi logowania :)",
        data: response,
      });
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
}
