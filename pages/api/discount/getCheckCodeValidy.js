import Discount from 'model/discount';
import Carts from 'model/carts';
import dbConnect from 'app/lib/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const readyData = req.query;
		await dbConnect();
		const code = await Discount.findOne({ code: readyData.code });
		if (code) {
			const cart = await Carts.findByIdAndUpdate(readyData.cart, {
				discount: {
					code: code.code,
					expiredIn: code.expiredIn,
					discountId: code._id,
					discountValue: code.value,
					discountType: code.type,
				},
			});
			return res.status(200).json({ data: code });
		} else {
			return res.status(200).json({ data: null });
		}
	} else {
		return res.status(400).json({ mess: 'niedozwolone' });
	}
}
