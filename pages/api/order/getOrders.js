import Order from 'model/orders';
import dbConnect from 'app/lib/dbConnect';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	const session = await getSession({ req });
	if (req.method === 'GET' && session) {
		await dbConnect();

		const id = req.query._id;

		const order = await Order.find({
			$and: [id, { 'user.userId': session.user.uid }],
		}).sort({ createdAt: 'desc' });

		return res.status(200).json(order);
	} else {
		return res.status(402).json({ mess: 'niedozwolone' });
	}
}
