import Settings from "../../../model/settings";
import dbConnect from "../../../app/lib/dbConnect";
import { useState } from "react";
import { getSession } from "next-auth/react";
import { createHmac } from "crypto";
export default async function handler(req, res) {
  const session = await getSession({ req });
  if (req.method === "GET") {
    if (session) {
      const hash = createHmac(
        "sha256",
        "1026020dcc6c4d43910bd596a0b1ece575fb6d64"
      )
        .update(session.user.email ? session.user.email : "none")
        .digest("hex");
      return res.status(200).json(hash);
    } else {
      const hash = createHmac(
        "sha256",
        "1026020dcc6c4d43910bd596a0b1ece575fb6d64"
      )
        .update("none")
        .digest("hex");
      return res.status(200).json(hash);
    }
  } else {
    return res.status(400).json({ err: "WRONG METHOD" });
  }
}
