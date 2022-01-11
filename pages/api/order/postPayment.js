import Cart from "../../../model/carts";
import Order from "../../../model/orders";
import dbConnect from "../../../app/lib/dbConnect";
import { getSession } from "next-auth/react";
import axiosInstance, { hotpayAxios } from "../../../app/lib/axiosInstance";
import dayjs from "dayjs";
import { createHash } from "crypto";
export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === "POST" && session) {
    await dbConnect();
    const readyData = req.body;

    const order = await axiosInstance.get("/api/order/getOrder", {
      params: {
        orderId: readyData.orderId,
      },
      headers: {
        cookie: req.headers.cookie,
      },
    });
    const KWOTA = order.data.totalValue;
    const ID_ZAMOWIENIA = order.data._id;
    const EMAIL = order.data.user.email
      ? order.data.user.email
      : "help@plejerek.pl";
    const DANE_OSOBOWE = order.data.user.name;
    const SEKRET = process.env.HOTPAY_SECRET;

    const NAZWA_USLUGI = "PLEJEREK.PL";
    const ADRES_WWW = process.env.ADDRESS;
    const TYP = "INIT";
    const HASH_BEF =
      process.env.HOTPAY_PASSW +
      ";" +
      KWOTA +
      ";" +
      NAZWA_USLUGI +
      ";" +
      ADRES_WWW +
      ";" +
      ID_ZAMOWIENIA +
      ";" +
      SEKRET;

    const HASH = createHash("sha256").update(HASH_BEF).digest("hex");
    try {
      const token = await hotpayAxios.post("/", null, {
        params: {
          SEKRET: SEKRET,
          KWOTA: KWOTA,
          KWOTA: KWOTA,
          NAZWA_USLUGI: NAZWA_USLUGI,
          ADRES_WWW: ADRES_WWW,
          ID_ZAMOWIENIA: ID_ZAMOWIENIA,
          EMAIL: EMAIL,
          DANE_OSOBOWE: DANE_OSOBOWE,
          TYP: TYP,
          HASH: HASH,
        },
      });
      return res.status(200).json({
        mess: "Poprawnie utworzono link do płatności",
        link: token.data.URL,
        datas: {
          SEKRET: SEKRET, 
          KWOTA: KWOTA,
          KWOTA: KWOTA,
          NAZWA_USLUGI: NAZWA_USLUGI,
          ADRES_WWW: ADRES_WWW,
          ID_ZAMOWIENIA: ID_ZAMOWIENIA,
          EMAIL: EMAIL,
          DANE_OSOBOWE: DANE_OSOBOWE,
          TYP: TYP,
          HASH: HASH,
        },
      });
    } catch (err) {}
  } else {
    return res.status(405).json({ mess: "WRONG METHOD OR SESSION ERROR" });
  }
}
