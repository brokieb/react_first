import Credentials from '../../model/credentials';
import dbConnect from '../../lib/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		await dbConnect();
		if (req.query._id != null) {
			const cred = await Credentials.findById(req.query._id);
			return res.status(201).json(cred);
		} else {
			const cred = await Credentials.find();
			return res.status(200).json(cred);
		}
	}
}
