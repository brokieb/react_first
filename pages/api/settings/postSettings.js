import Settings from "model/settings";
import dbConnect from "app/lib/dbConnect";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await dbConnect();
    const readyData = req.body;
    const setting = new Settings({
      code: "test",
      value: "test2",
    });

    const newSetting = await setting.save();
    return res.status(200).json({ mess: "Poprawnie utworzono zamówienie" });
  } else {
    return res.status(402).json({ mess: "Bład typu" });
  }
}
