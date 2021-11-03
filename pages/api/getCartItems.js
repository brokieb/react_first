import User from '../../model/users';
import Product from '../../model/product';
import dbConnect from '../../lib/dbConnect';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	console.log('DZIAŁA TO!');
	const session = await getSession({ req });
	if (req.method === 'GET' && session) {
		try {
			await dbConnect();
			const cart = await User.findById(session.user.uid).populate('cart.items.productId');
			return res.status(200).json(cart);
		} catch (err) {
			return res.status(400).json(err);
		}
	} else {
		return res.status(401).json({ err: 'WRONG METHOD' });
	}
}
