import Credentials from 'model/credentials';
import Orders from 'model/orders';
import dbConnect from 'app/lib/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		await dbConnect();
		const cred = await (req.query._id
			? Credentials.findById(req.query._id)
			: Credentials.find()
		).populate(['productId', 'users.orderId', 'usersHistory.orderId']);
		switch (req.query.mode) {
			case 'SIBLINGS':
				const sibs = await Credentials.find({
					$and: [
						{ productId: cred.productId },
						{ _id: { $nin: [cred._id] } },
						{
							$expr: { $lte: [{ $sum: ['$usersLen', req.query.users] }, '$usersMaxLen'] },
						},
					],
				});
				return res.status(200).json(sibs);
			default:
				return res.status(200).json(cred);
		}
	}
}
