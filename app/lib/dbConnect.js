import mongoose from 'mongoose';
async function dbConnect() {
	mongoose
		.connect(process.env.MONGO_DB)
		.then((mongoose) => {
			return mongoose;
		})
		.catch((err) => {
			throw 'Nie ma połączenia z bazą';
		});
}
export default dbConnect;
