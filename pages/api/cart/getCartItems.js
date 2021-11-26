import User from 'model/users';
import Cart from 'model/carts';
import Product from 'model/product';
import dbConnect from 'app/lib/dbConnect';
import { getSession } from 'next-auth/react';
import { faBreadSlice } from '@fortawesome/free-solid-svg-icons';

export default async function handler(req, res) {
	const session = await getSession({ req });
	await dbConnect();
	if (req.method === 'GET') {
		const readyData = req.query;
		let carts = [];
		if (session) {
			const userCart = await Cart.findOne({ userId: session.user.uid }).populate(
				'cart.items.productId',
			);
			if (userCart) {
				carts.push(userCart);
			}
		}
		if (readyData.cart) {
			const cookieCart = await Cart.findById(readyData.cart).populate('cart.items.productId');
			if (cookieCart) {
				carts.push(cookieCart);
			}
		}
		switch (carts.length) {
			case 0:
				return res.status(200).json({ status: 'NO_CART' });
			case 1:
				return res.status(200).json({
					main: carts[0],
					status: 'COOKIE_CART',
				});

			default:
				carts[0].cart.items.forEach((item) => {
					const findItem = carts[1].cart.items.filter((element) => {
						return element.productId._id.toString() === item.productId._id.toString();
					});
					if (findItem.length) {
						item.quantity = item.quantity + findItem[0].quantity;
					}
				});
				const difference = carts[1].cart.items.filter((x) => {
					let isHere = false;
					carts[0].cart.items.forEach((el) => {
						if (el.productId._id.toString() === x.productId._id.toString()) {
							isHere = true;
						}
					});
					if (!isHere) {
						return true;
					}
				});
				carts[0].cart.items = [...carts[0].cart.items, ...difference];

				return res.status(200).json({ main: carts[0], status: 'MERGET_CART' });
		}
	} else {
		return res.status(402).json({ err: 'WRONG METHOD' });
	}
}
