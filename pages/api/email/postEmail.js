
import Email from 'email-templates'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const readyData = req.body;
        console.log(readyData, '###')

        const email = new Email({
            message: {
                from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_USER}>`
            },
            send: readyData.test ? false : true,
            preview: false,
            transport: {
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                ssl: false,

                auth: {
                    user: process.env.EMAIL_USER, // your Mailtrap username
                    pass: process.env.EMAIL_PASS //your Mailtrap password
                }
            }
        });

        email
            .send({
                template: readyData.template,
                message: {
                    to: readyData.to
                },
                locals: {},
                preview: false,
            }).then(() => {
                return res.status(200).json("OK")
            })
            .catch((err) => {
                return res.status(400).json("bład")
            });



    } else {
        return res.status(401).json("wrong method")
    }
}
