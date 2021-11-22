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
				orderId: {
					type: Schema.Types.ObjectId,
					ref: 'Order',
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
		usersHistory: [
			{
				orderId: {
					type: Schema.Types.ObjectId,
					ref: 'Order',
				},
				profileName: {
					type: String,
				},
				addedTime: {
					type: Date,
					required: true,
				},
				expiredIn: {
					type: Date,
					required: true,
				},
				status: {
					type: String,
					enum: ['BANNED', 'MOVED'],
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
