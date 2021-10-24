import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const credentialsSchema = new Schema({
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
	productId: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
	},
	// users: {
	//     profiles:[{

	//     }]
	// }
});

export default mongoose.models.Credentials || mongoose.model('Credentials', credentialsSchema);
