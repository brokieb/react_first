import User from 'model/users';
import Cart from 'model/carts';
import dbConnect from 'app/lib/dbConnect';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	if (req.method === 'PUT') {
		const session = await getSession({ req });
		await dbConnect();
		const readyData = req.body.params;
		console.log(readyData);
		await (session ? User.find({ _id: session.user.uid }) : readyData.cart ? Cart.find({ _id: readyData.cart }) : Cart.find({ _id: null }))
			.then((user) => {
				let qty = 1;
				if (user.length) {
					console.log('NIE PUSTO');
					const oldCart = user[0].cart.items;
					console.log(oldCart, '@_@_@');
					if (oldCart) {
						console.log('asdasdasdda');
						oldCart.forEach((obj) => {
							if (obj.productId.toString() === readyData.productId.toString()) {
								qty = obj.quantity + 1;
							}
						});
						const updatedCartItems = oldCart.filter((item) => {
							return item.productId.toString() !== readyData.productId.toString();
						});
						user[0].cart.items = [
							...updatedCartItems,
							{
								productId: readyData.productId,
								quantity: qty,
							},
						];
					} else {
						user[0].cart.items = {
							productId: readyData.productId,
							quantity: qty,
						};
					}
					return user[0].save();
				} else {
					const cart = new Cart({
						cart: {
							items: [
								{
									productId: readyData.productId,
									quantity: qty,
								},
							],
						},
					});
					return cart.save();
					console.log('PUSTO');
				}
			})
			.then((data) => {
				return res.status(200).json({ mess: 'Poprawnie dodano do koszyka :)', newCart: data });
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
}
