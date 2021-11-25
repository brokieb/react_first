import Product from 'model/product';
import Credentials from 'model/credentials';
import dbConnect from 'app/lib/dbConnect';
import users from 'model/users';
import carts from 'model/carts';

export default async function handler(req, res) {
	if (req.method === 'DELETE') {
		await dbConnect();
		// const prod = await Product.findByIdAndDelete(req.query.id);
		//
		const usersArray = await users.find({ 'cart.items.productId': req.query.id });
		for (const user of usersArray) {
			user.cart.items = user.cart.items.filter((item) => {
				return item.productId != req.query.id;
			});
			await user.save();
		}

		const cartsArray = await carts.find({ 'cart.items.productId': req.query.id });
		for (const cartData of cartsArray) {
			cartData.cart.items = cartData.cart.items.filter((item) => {
				return item.productId != req.query.id;
			});
			await cartData.save();
		}

		return res.status(200).json({ ans: 'OK' });
	} else {
		return res.status(400).json({ err: 'not geet' });
	}
}
