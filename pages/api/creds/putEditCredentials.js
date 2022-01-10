import Credentials from "../../../model/credentials";
import dbConnect from "../../../app/lib/dbConnect";
import dayjs from "dayjs";
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

        if (readyData.newStatus) {
          creds.active = readyData.newStatus;
        }
        if (readyData.expiredInAddDays) {
          const now = dayjs(creds.expiredIn);
          creds.expiredIn = now.add(30, "day");
        }
        if (readyData.expiredIn) {
          creds.expiredIn = readyData.expiredIn;
        }
        if (readyData.password) {
          creds.password = readyData.password;
        }
        if (readyData.comment) {
          creds.comment = readyData.comment;
        }
        const ans = await creds.save();
        // await Credentials.findByIdAndUpdate(, {
        // 	active: readyData.newStatus,
        // 	expredIn: {
        // 		$dateAdd: {
        // 			startDate: '$expiredIn',
        // 			unit: 'month',
        // 			amount: 1,
        // 		},
        // 	},
        // });
        return res.status(200).json({
          mess: "Poprawnie zaktualizowano objekt z danymi logowania :)",
          data: ans,
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
