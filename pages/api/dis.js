export default async (req, res) => {
  if (req.method === "GET") {
    import { getSession } from "next-auth/react";
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
};
