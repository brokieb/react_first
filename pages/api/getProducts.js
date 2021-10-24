import Product from '../../model/product';
import Credentials from '../../model/credentials';
import dbConnect from '../../lib/dbConnect';

export default async function handler(req, res) {
	console.log('nie dziala');
	if (req.method === 'GET') {
		await dbConnect();
		if (req.query._id != null) {
			const prod = await Product.findById(req.query._id).populate('credentials.credentialsId');
			return res.status(201).json(prod);
		} else {
			const prod = await Product.find();
			return res.status(200).json(prod);
		}
	}
}
