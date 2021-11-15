export default async function handler(req, res) {
	return res.status(402).json({ err: 'WRONG METHOD' });
}
