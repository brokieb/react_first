import User from '../../model/users';
import dbConnect from '../../lib/dbConnect';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	const session = await getSession({ req });
	if (req.method === 'PUT' && session) {
		console.log(session, 'dziala, uruchamian');
		const readyData = req.body.params;
		await dbConnect();
		await User.findById(session.user.uid)
			.then((user) => {
				let qty = 1;

				if (user.cart.items.length > 0) {
					const oldCart = user.cart.items;
					user.cart.items.forEach((obj) => {
						if (obj.productId.toString() === readyData.productId.toString()) {
							qty = obj.quantity + 1;
						}
					});
					const updatedCartItems = user.cart.items.filter((item) => {
						return item.productId.toString() !== readyData.productId.toString();
					});
					user.cart.items = [
						...updatedCartItems,
						{
							productId: readyData.productId,
							quantity: qty,
						},
					];
				} else {
					user.cart.items = {
						productId: readyData.productId,
						quantity: qty,
					};
				}
				return user.save();
			})
			.then((data) => {
				return res.status(200).json({ mess: 'Poprawnie dodano do koszyka :)', newCart: data });
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
}
