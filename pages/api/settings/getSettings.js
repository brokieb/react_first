import Settings from "model/settings";
import dbConnect from "app/lib/dbConnect";
import { useState } from "react";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const readyData = req.query;
    await dbConnect();
    let settings = [];
    if (readyData.code) {
      settings = await Settings.find({
        code: readyData.code,
      });
      // return res.status(200).json(setting);
    } else if (readyData.codes) {
      settings = await Settings.find({
        code: { $in: JSON.parse(readyData.codes) },
      });
      // return res.status(200).json(setting);
    } else {
      settings = await Settings.find();
    }
    // console.log(settings,"<<<<");
    let arr = {};
    for (const item of settings) {
      arr = {
        ...arr,
        [item.code]: {
          value: item.value,
          title: item.title,
        },
      };
    }
    return res.status(200).json(arr);
  }
}
