import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const accountSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	expiredIn: {
		type: Date,
		required: true,
	},
	comment: {
		type: String,
	},
	active: {
		type: Boolean,
		default: true,
	},
	// users: {
	//     profiles:[{

	//     }]
	// }
});

export default mongoose.models.Account || mongoose.model('Acount', accountSchema);
