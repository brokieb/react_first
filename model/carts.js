const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartsSchema = new Schema(
	{
		cart: {
			items: [
				{
					productId: {
						type: Schema.Types.ObjectId,
						required: true,
						ref: 'Product',
					},
					quantity: {
						type: Number,
						required: true,
					},
				},
			],
		},
		discount: {
			code: {
				type: String,
			},
			expiredIn: {
				type: Date,
			},
			discountValue: {
				type: Number,
			},
			discountType: {
				type: String,
				enum: ['PERCENT', 'AMOUNT'],
			},
			discountId: {
				type: Schema.Types.ObjectId,
				ref: 'DiscountCode',
			},
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'Users',
		},
	},
	{ timestamps: true },
);

export default mongoose.models.Carts || mongoose.model('Carts', cartsSchema);
