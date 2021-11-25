import Product from 'model/product';
import dbConnect from 'app/lib/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const readyData = req.body.params;
		await dbConnect();
		const prod = await Product.findById(readyData.id);
		prod.title = readyData.title;
		prod.SKU = readyData.sku;
		prod.imageUrl = readyData.imageUrl;
		prod.price = readyData.price;
		prod.shortDescription = readyData.shortDescription;
		prod.description = readyData.description;
		prod.settings.usersPerAccount = readyData.maxUsers;

		const result = await prod.save();

		return res.status(201).json({ mess: 'Poprawnie zedytowano produkt' });
	}
}
