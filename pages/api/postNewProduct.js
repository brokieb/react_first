import Product from '../../model/product';
import dbConnect from '../../lib/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const readyData = req.body.params;
		await dbConnect();
		const prod = new Product({
			title: readyData.title,
			description: readyData.description,
			price: readyData.price,
			imageUrl: readyData.imageUrl,
		});

		const result = await prod.save();

		return res.status(201).json({ mess: 'Poprawnie dodano produkt' });
	}
}
