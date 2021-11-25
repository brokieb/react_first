import Product from 'model/product';
import Credentials from 'model/credentials';
import dbConnect from 'app/lib/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		await dbConnect();
		const prod = await (req.query._id ? Product.findById(req.query._id) : Product.find());
		return res.status(201).json(prod);
	} else {
		return res.status(400).json({ err: 'not geet' });
	}
}
