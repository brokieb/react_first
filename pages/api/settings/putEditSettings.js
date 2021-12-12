import Settings from "model/settings";
import dbConnect from "app/lib/dbConnect";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    await dbConnect();
    const readyData = req.body;
    for (const data of readyData) {
      // for (const data in datas) {
      //   console.log("=------", { code: data }, { value: datas[data] });
      await Settings.findOneAndUpdate(
        { code: data.code },
        { value: data.value }
      );
      // }
    }

    return res.status(200).json({ mess: "Poprawnie zapisano" });
  }
}
