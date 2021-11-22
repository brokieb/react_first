import Credentials from 'model/credentials';
import dbConnect from 'app/lib/dbConnect';
import dayjs from 'dayjs';
import users from 'model/users';
import { cartItemsCounterSlice } from 'app/features/counter/counterSlice';

export default async function handler(req, res) {
	try {
		if (req.method === 'PUT') {
			const readyData = req.body.params;
			await dbConnect();

			const creds = await Credentials.findOne({ 'users._id': { $in: readyData.users } });
			const credId = creds._id;
			const usersToMoveCount = readyData.users.length;
			const usersToMove = creds.users.filter((item) => {
				return readyData.users.includes(item._id.toString());
			});
			creds.users = creds.users.filter((item) => {
				return !readyData.users.includes(item._id.toString());
			});
			creds.usersHistory.push(
				...usersToMove.map((item) => {
					console.log(item, '@@@@@@@@@@@@@');
					return {
						orderId: item.orderId,
						profileName: item.profileName,
						expiredIn: dayjs(item.expiredIn).format(),
						addedTime: dayjs().format(),
						status: 'BANNED',
					};
				}),
			);
			creds.usersLen = creds.usersLen - usersToMoveCount;

			const old = await creds.save();
			console.log('+++++++++++++++++++');
			const response = await Credentials.findById(credId).populate([
				'productId',
				'users.orderId',
				'usersHistory.orderId',
			]);
			return res
				.status(200)
				.json({ mess: 'Poprawnie zaktualizowano objekt z danymi logowania :)', data: response });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({ err: error });
	}
}
