const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		user: {
			name: {
				type: String,
				required: true,
			},
			email: {
				type: String,
			},
			userId: {
				type: Schema.Types.ObjectId,
				required: true,
				ref: 'Users',
			},
		},
		products: [
			{
				productId: {
					type: Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
				productTitle: {
					type: String,
					required: true,
				},
				productQty: {
					type: Number,
					required: true,
				},
				productPrice: {
					type: Number,
					required: true,
				},
				productValue: {
					type: Number,
					required: true,
				},
				productStatus: {
					type: String,
					enum: ['NEW', 'IN_PROGRESS', 'FINISHED'],
					default: 'NEW',
				},
			},
		],
		totalValue: {
			type: Number,
			required: true,
		},
		orderSource: {
			type: String,
			enum: ['ALLEGRO', 'STORE'],
		},
		orderStatus: {
			type: String,
			enum: ['NEW', 'NOT-PAID', 'PAID', 'IN_PROGRESS', 'FINISHED'],
			required: true,
		},
	},
	{ timestamps: true },
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
