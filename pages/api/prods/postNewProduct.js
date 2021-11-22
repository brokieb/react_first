import Product from 'model/product';
import dbConnect from 'app/lib/dbConnect';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const readyData = req.body.params;
		await dbConnect();
		console.log(readyData);
		const prod = new Product({
			title: readyData.title,
			SKU: readyData.sku,
			imageUrl: readyData.imageUrl,
			price: readyData.price,
			shortDescription: readyData.shortDescription,
			description: readyData.description,
			'settings.usersPerAccount': readyData.maxUsers,
		});

		const result = await prod.save();

		return res.status(201).json({ mess: 'Poprawnie dodano produkt' });
	}
}
