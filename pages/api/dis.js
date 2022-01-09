export default async (req, res) => {
  if (req.method === "GET") {
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
};
