import Credentials from 'model/credentials';
import dbConnect from 'app/lib/dbConnect';
import dayjs from 'dayjs';

export default async function handler(req, res) {
	try {
		if (req.method === 'PUT') {
			const readyData = req.body.params;
			await dbConnect();
			const creds = await Credentials.findById(readyData.id);

			if (readyData.newStatus) {
				creds.status = readyData.newStatus;
			}
			if (readyData.expiredInAddDays) {
				const now = dayjs(creds.expiredIn);
				creds.expiredIn = now.add(30, 'day');
			}
			await creds.save();
			// await Credentials.findByIdAndUpdate(, {
			// 	active: readyData.newStatus,
			// 	expredIn: {
			// 		$dateAdd: {
			// 			startDate: '$expiredIn',
			// 			unit: 'month',
			// 			amount: 1,
			// 		},
			// 	},
			// });
			return res.status(200).json({ mess: 'Poprawnie zaktualizowano objekt z danymi logowania :)' });
		}
	} catch (error) {
		return res.status(400).json({ err: error });
	}
}
