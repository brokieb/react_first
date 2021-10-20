import bcrypt from 'bcrypt';
import User from '../../model/users';
import dbConnect from '../../lib/dbConnect';

export default async function handler(req, res) {
	console.log('wyslanko');
	if (req.method === 'POST') {
		const readyData = req.query;
		await dbConnect();
		console.log(req.body);
		const user = await new User({
			name: readyData.name,
			email: readyData.email,
			image: readyData.image,
		});

		const result = await user.save();

		return res.status(201).json({ mess: 'Poprawnie dodano klienta' });
	}
}
