import Credentials from 'model/credentials';
import dbConnect from 'app/lib/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		await dbConnect();
		const cred = await (req.query._id ? Credentials.findById(req.query._id) : Credentials.find()).populate('productId');
		return res.status(201).json(cred);
	}
}
