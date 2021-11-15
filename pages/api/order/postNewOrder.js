import User from 'model/users';
import Order from 'model/orders';
import dbConnect from 'app/lib/dbConnect';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	const session = await getSession({ req });
	if (req.method === 'POST' && session) {
		await dbConnect();
		const user = await User.findById(session.user.uid).populate('cart.items.productId');
		let totalValue = 0;
		const order = new Order({
			user: {
				name: session.user.name,
				email: session.user.email,
				userId: session.user.uid,
			},
			products: user.cart.items.map((item) => {
				totalValue += item.productId.price * item.quantity;
				return {
					productId: item.productId._id,
					productTitle: item.productId.title,
					productQty: item.quantity,
					productPrice: item.productId.price,
					productValue: item.productId.price * item.quantity,
				};
			}),
			totalValue: totalValue,
			orderSource: 'STORE',
			orderStatus: 'NEW',
		});
		const newOrder = await order.save();
		const updateUser = await User.findByIdAndUpdate(session.user.uid, {
			cart: { items: [] },
		});
		return res.status(200).json({ mess: 'Poprawnie utworzono zamówienie', _id: newOrder._id });
	}
}
