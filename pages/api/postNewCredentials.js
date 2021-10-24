import Credentials from '../../model/credentials';
import Product from '../../model/product';
import dbConnect from '../../lib/dbConnect';
import mongoose from 'mongoose';

export default async function handler(req, res) {
	try {
		if (req.method === 'POST') {
			const readyData = req.body.params;
			await dbConnect();
			const cred = new Credentials({
				productId: new mongoose.Types.ObjectId(readyData.productId),
				email: readyData.email,
				password: readyData.password,
				expiredIn: readyData.expiredIn,
				comment: readyData.comment,
				active: readyData.active,
			});
			const ans = await cred.save();
			await Product.findByIdAndUpdate(ans.productId, { $push: { credentials: { credentialsId: ans._id } } });
			return res.status(201).json({ mess: 'Poprawnie dodano produkt' });
		}
	} catch (error) {
		console.log(error);
	}
}
