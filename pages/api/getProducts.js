import Product from '../../model/product';
import dbConnect from '../../lib/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		await dbConnect();
		if (req.query._id != null) {
			const prod = await Product.findById(req.query._id);
			return res.status(201).json(prod);
		} else {
			const prod = await Product.find();
			return res.status(201).json(prod);
		}
	}
}
