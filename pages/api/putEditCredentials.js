import Credentials from '../../model/credentials';
import dbConnect from '../../lib/dbConnect';

export default async function handler(req, res) {
	try {
		if (req.method === 'PUT') {
			const readyData = req.body.params;
			await dbConnect();
            await Credentials.findByIdAndUpdate(readyData.id, { active:readyData.newStatus } );
			return res.status(204).json({ mess: 'Poprawnie zaktualizowano objekt z danymi logowania :)' });
		}
	} catch (error) {
		console.log(error);
	}
}
