import Credentials from 'model/credentials';
import dbConnect from 'app/lib/dbConnect';
import dayjs from 'dayjs';

export default async function handler(req, res) {
	try {
		if (req.method === 'PUT') {
			const readyData = req.body.params;
			await dbConnect();
			const creds = await Credentials.findById(readyData.id);
			creds.usersLen = creds.users.length;
			const ans = await creds.save();
			return res.status(200).json({ mess: 'Poprawnie naprawiono konto :)', data: ans });
		}
	} catch (error) {
		return res.status(400).json({ err: error });
	}
}
