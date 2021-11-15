import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const credentialsSchema = new Schema(
	{
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
		users: [
			{
				orderPartId: {
					type: Schema.Types.ObjectId,
					ref: 'Order.products._id',
				},
				profileName: {
					type: String,
				},
				expiredIn: {
					type: Date,
					required: true,
				},
			},
		],
		usersLen: {
			type: Number,
			default: 0,
		},
		usersMaxLen: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true },
);

export default mongoose.models.Credentials || mongoose.model('Credentials', credentialsSchema);
