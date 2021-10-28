import bcrypt from 'bcrypt';
import User from '../../../model/users';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(req, res) {
	console.log('wyslanko');
	if (req.method === 'POST') {
		const readyData = req.body.params;
		const saltRounds = 10;
		console.log(readyData, '???????????????????');

		await dbConnect();

		bcrypt
			.hash(readyData.password, saltRounds)
			.then((readyPassword) => {
				return new User({
					name: readyData.name,
					email: readyData.email,
					image: readyData.image,
					password: readyPassword,
				});
				// Store hash in your password DB.
			})
			.then((user) => {
				return user.save();
			})
			.then(() => {
				res.status(201).json({ mess: 'Poprawnie dodano' });
			})
			.catch((err) => {
				console.log(err);
				return res.status(401).json({ mess: err });
			});
	}
}
