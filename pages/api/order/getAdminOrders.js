import Order from 'model/orders';
import dbConnect from 'app/lib/dbConnect';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		await dbConnect();
		const orders = await Order.find().sort({ createdAt: 'desc' });
		return res.status(200).json(orders);
	} else {
		return res.status(400).json({ mess: 'niedozwolone' });
	}
}
