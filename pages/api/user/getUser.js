import User from 'model/users';
import Product from 'model/product';
import dbConnect from 'app/lib/dbConnect';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	const session = await getSession({ req });
	if (req.method === 'GET') {
		if (session) {
			await dbConnect();
			const user = await User.findById(session.user.uid);
			return res.status(200).json(user);
		} else {
			return res.status(401).json({ err: 'NO LOGIN' });
		}
	} else {
		return res.status(402).json({ err: 'WRONG METHOD' });
	}
}
