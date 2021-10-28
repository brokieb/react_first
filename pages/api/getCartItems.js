import User from '../../model/users';
import Product from '../../model/product';
import dbConnect from '../../lib/dbConnect';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	console.log('DZIAŁA TO!');
	const session = await getSession({ req });
	if (req.method === 'GET' && session) {
		await dbConnect();
		User.findById(session.user.uid)
			.populate('cart.items.productId')
			.then((cart) => {
				return res.status(200).json(cart);
			})
			.catch((err) => {
				console.log(err);
				return res.status(402).json({ err: err });
			});
	} else {
		return res.status(401).json({ err: 'WRONG METHOD' });
	}
}
