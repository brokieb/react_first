import User from '../../model/users';
import Order from '../../model/orders';
import dbConnect from '../../lib/dbConnect';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	const session = await getSession({ req });
	if (req.method === 'POST' && session) {
		console.log(session);
		await dbConnect();
		await User.findById(session.user.uid)
			.populate('cart.items.productId')
			.then((user) => {
				const prod = new Order({
					user: {
						name: session.user.name,
						email: session.user.email,
						userId: session.user.uid,
					},
					products:{
						
					}
				});
				return res.status(200).json({ user });
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
}
