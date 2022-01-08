import fs from "fs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const readyData = req.body;

    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      await saveFile(files.file);
      return res.status(201).send("");
    });

    return res.status(200).json({ mess: "Poprawnie utworzono zamówienie" });
  } else {
    return res.status(405).json({ mess: "Bład typu" });
  }
}

const saveFile = async (file) => {
  const data = fs.readFileSync(file.path);
  fs.writeFileSync(`../../public/${file.name}`, data);
  await fs.unlinkSync(file.path);
  return;
};
