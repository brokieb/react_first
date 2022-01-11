import { createHash } from "crypto";
import orders from "../../../model/orders";
export default async (req, res) => {
  const readyData = req.body;
  if (
    readyData.KWOTA &&
    readyData.ID_PLATNOSCI &&
    readyData.ID_ZAMOWIENIA &&
    readyData.STATUS &&
    readyData.SEKRET &&
    readyData.HASH
  ) {
    const toHash =
      "Damian#3;" +
      readyData.KWOTA +
      ";" +
      readyData.ID_PLATNOSCI +
      ";" +
      readyData.ID_ZAMOWIENIA +
      ";" +
      readyData.STATUS +
      ";1;" +
      readyData.SEKRET;
    const hashed = createHash("sha256").update(toHash).digest("hex");
    if (hashed == readyData.HASH) {
      const order = await orders.findByIdAndUpdate(readyData.ID_ZAMOWIENIA, {
        orderStatus: "PAID",
      });
      if (order) {
        return res.status(200).json({ mess: "POPRAWNIE ZAPŁACONO" });
      } else {
        return res.status(400).json({ err: "BŁĄD AKTUALIZACJI" });
      }
    } else {
      return res.status(400).json({ err: "NIEPRAWIDŁOWE DANE" });
    }
  } else {
    return res.status(400).json({ err: "BRAK DANYCH" });
  }
};
