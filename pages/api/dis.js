export default async (req, res) => {
  req.body;
  return res.status(200).json({ ans: "ALL DZIAŁA", body: req.body });
};
