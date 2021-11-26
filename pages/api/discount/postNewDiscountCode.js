import Discount from 'model/discount';
import Order from 'model/orders';
import dbConnect from 'app/lib/dbConnect';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const readyData = req.body.params;
		await dbConnect();
		const discount = new Discount({
			code: readyData.code,
			codeQty: readyData.codeQty,
			expiredIn: readyData.expiredIn,
			type: readyData.type,
			value: readyData.value,
			limits: readyData.limits,
		});
		const newDiscount = await discount.save();
		if (newDiscount) {
			return res.status(200).json({ mess: 'Poprawnie utworzono zniżkę', data: newDiscount });
		} else {
			return res.status(400).json({ mess: 'Błąd' });
		}
	}
}
