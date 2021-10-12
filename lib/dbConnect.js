import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://damian:VdSbKsuJMbppa5uc@cluster0.0bguq.mongodb.net/react?retryWrites=true&w=majority';

async function dbConnect() {
	mongoose.connect(MONGODB_URI).then((mongoose) => {
		return mongoose;
	});
}

export default dbConnect;
