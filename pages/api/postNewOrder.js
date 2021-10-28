import User from '../../model/users';
import dbConnect from '../../lib/dbConnect';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	const session = await getSession({ req });
	if (req.method === 'POST' && session) {
		const readyData = req.body.params;
		await dbConnect();
		await User.findById(session.user.uid)
			.then((user) => {
				// return res.status(200).json({ mess: 'Poprawnie dodano do koszyka :)', newCart: data });
			})
			.catch((err) => {
				throw new Error(err);
			});
	}
}
