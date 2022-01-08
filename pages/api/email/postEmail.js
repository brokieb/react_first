import Email from "email-templates";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    if (session && session.user.permission == 2) {
      // Signed in
      const reqBody = req.body;
      const reqParams = req.query;
      const email = new Email({
        message: {
          from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`,
        },
        send: reqParams.test ? false : true,
        preview: false,
        transport: {
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          ssl: false,

          auth: {
            user: process.env.EMAIL_USER, // your Mailtrap username
            pass: process.env.EMAIL_PASS, //your Mailtrap password
          },
        },
      });
      try {
        const sended = await email.send({
          template: reqParams.template,
          message: {
            to: reqParams.to,
          },
          locals: reqBody,
          preview: false,
        });
        return res.status(200).json("OK");
      } catch (err) {
        return res.status(400).json("err sending mail");
      }
    } else {
      // Not Signed in
      res.status(401).json({ err: "NOT AUTHORIZED" });
    }
  } else {
    return res.status(405).json({ err: "WRONG METHOD" });
  }
}
