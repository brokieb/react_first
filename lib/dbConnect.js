import mongoose from 'mongoose';
async function dbConnect() {
	mongoose
		.connect(process.env.MONGO_DB)
		.then((mongoose) => {
			console.log('BAZA DANYCH OK ~~', process.env.MONGO_DB);
			return mongoose;
		})
		.catch((err) => {
			console.log('????????????????????????');
		});
}
export default dbConnect;
