import Credentials from 'model/credentials';
import Orders from 'model/orders';
import dbConnect from 'app/lib/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		await dbConnect();
		const cred = await Credentials.find({ productId: req.query._id }).populate([
			'users.orderId',
			'usersHistory.orderId',
		]);
		return res.status(200).json(cred);
	}
}
