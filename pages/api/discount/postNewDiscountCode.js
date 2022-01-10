import Discount from "../../../model/discount";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      const readyData = req.body.params;
      await dbConnect();
      const discount = new Discount({
        code: readyData.code,
        codeQty: readyData.codeQty,
        expiredIn: readyData.expiredIn,
        type: readyData.type,
        value: readyData.value,
        limits: readyData.limits,
      });
      const newDiscount = await discount.save();
      if (newDiscount) {
        return res
          .status(200)
          .json({ mess: "Poprawnie utworzono zniżkę", data: newDiscount });
      } else {
        return res.status(400).json({ mess: "Błąd" });
      }
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
}
