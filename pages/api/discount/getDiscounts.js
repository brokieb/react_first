import Discount from 'model/discount';
import dbConnect from 'app/lib/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'GET') {
		await dbConnect();
		const codes = await Discount.find();
		return res.status(200).json({ data: codes });
	} else {
		return res.status(400).json({ mess: 'niedozwolone' });
	}
}
