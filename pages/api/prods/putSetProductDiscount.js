import Product from 'model/product';
import dbConnect from 'app/lib/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'PUT') {
		const readyData = req.body.params;
		await dbConnect();
		const prod = await Product.findById(readyData.id);
		if (readyData.discountValue > 0) {
			prod.discount = {
				discountValue: readyData.discountValue,
				discountUntil: readyData.discountUntil,
			};
		} else {
			prod.discount = {};
		}
		await prod.save();

		return res.status(200).json({ mess: 'OK' });
	}
}
