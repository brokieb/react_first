import Log from "../../../model/log";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const readyData = req.body;
    await dbConnect();
    const newLog = new Discount({
      code: readyData.code,
      customMessage: readyData.message ? readyData.message : undefined,
    });
    const newLogToSave = await newLog.save();
    return res.status(200).json({ mess: "Poprawnie dodano log" });
  } else {
    return res.status(400).json({ mess: "Błąd" });
  }
}
