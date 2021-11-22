import User from 'model/users';
import Cart from 'model/carts';
import Product from 'model/product';
import dbConnect from 'app/lib/dbConnect';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	const session = await getSession({ req });
	await dbConnect();
	if (req.method === 'GET') {
		const Carts = [];
		if (session) {
			const readyData = await User.findById(session.user.uid).populate('cart.items.productId');
			if (!readyData.cart) {
				await Cart.findById(readyData.cart).populate('cart.items.productId');
				if (Carts.length > 1) {
					Carts[0].cart.items.forEach((item) => {
						const findItem = Carts[1].cart.items.filter((element) => {
							return element.productId._id.toString() === item.productId._id.toString();
						});
						if (findItem.length) {
							item.quantity = item.quantity + findItem[0].quantity;
						}
					});
					const difference = Carts[1].cart.items.filter((x) => {
						let isHere = false;
						Carts[0].cart.items.forEach((el) => {
							if (el.productId._id.toString() === x.productId._id.toString()) {
								isHere = true;
							}
						});
						if (!isHere) {
							return true;
						}
					});
					Carts[0].cart.items = [...Carts[0].cart.items, ...difference];
				}
				return res
					.status(200)
					.json({ main: Carts[0], status: session ? 'MERGED_CARTS' : 'COOKIE_CART' });
			} else {
				if (session) {
					return res.status(200).json({ main: readyData, status: 'SESSION_CART' });
				} else {
					return res.status(200).json({ status: 'NO_CART' });
				}
			}
		}
	} else {
		return res.status(402).json({ err: 'WRONG METHOD' });
	}
}
