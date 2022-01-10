import Credentials from "../../../model/credentials";
import dbConnect from "../../../app/lib/dbConnect";
import dayjs from "dayjs";
import users from "../../../model/users";
import { cartItemsCounterSlice } from "../../../app/features/counter/counterSlice";
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
          "usersHistory._id": { $in: readyData.users },
        });
        const credId = creds._id;
        const usersToMoveCount = creds.usersHistory.length;
        const usersToMove = creds.usersHistory.filter((item) => {
          return readyData.users.includes(item._id.toString());
        });
        creds.usersHistory = creds.usersHistory.filter((item) => {
          return !readyData.users.includes(item._id.toString());
        });
        creds.users.push(
          ...usersToMove.map((item) => {
            return {
              orderId: item.orderId,
              profileName: item.profileName,
              expiredIn: dayjs(item.expiredIn).format(),
            };
          })
        );
        creds.usersLen = creds.usersLen + usersToMoveCount;

        const old = await creds.save();
        const response = await Credentials.findById(credId).populate([
          "productId",
          "users.orderId",
          "usersHistory.orderId",
        ]);
        return res
          .status(200)
          .json({ mess: "Poprawnie odbanowano :)", data: response });
      } catch (error) {
        return res.status(400).json({ err: error });
      }
    } else {
      // Not Signed in
      return res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
}
