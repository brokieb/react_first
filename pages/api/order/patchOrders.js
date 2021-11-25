import Order from 'model/orders';
import Credentials from 'model/credentials';
import Product from 'model/product';
import dbConnect from 'app/lib/dbConnect';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	// const session = await getSession({ req });
	if (req.method === 'PATCH') {
		await dbConnect();

		const orders = await Order.find({
			$or: [{ orderStatus: 'PAID' }, { orderStatus: 'IN_PROGRESS' }],
		}).select('products updatedAt');
		//
		for (const order of orders) {
			order.orderStatus = 'IN_PROGRESS';
			let noAccount = 0;
			for (const product of order.products) {
				//WSZYSTKIE PRODUKTY KTÓRE SĄ DO ZREALIZOWANIA
				if (product.productStatus == 'NEW' || product.productStatus == 'IN_PROGRESS') {
					product.productStatus = 'IN_PROGRESS';
					await order.save();
					const prod = await Product.findOne({ _id: product.productId }).select('settings');
					const creds = await Credentials.findOne({
						$and: [
							{ productId: product.productId },
							{ '$expr': { $lt: ['$usersLen', '$usersMaxLen'] } },
							{ active: true },
						],
					});
					if (creds) {
						creds.users = [
							...creds.users,
							{
								orderId: order._id,
								profileName: null,
								expiredIn: '2002-12-09',
							},
						];
						creds.usersLen = creds.usersLen + 1;
						product.productStatus = 'FINISHED';
						await order.save();
						await creds.save();
					} else {
						noAccount = noAccount + 1;
					}
				}
			}
			if (noAccount == 0) {
				order.orderStatus = 'FINISHED';
				await order.save();
			}
		}

		return res.status(200).json({ ans: 'asd' });
	} else {
		return res.status(402).json({ mess: 'niedozwolone' });
	}
}
