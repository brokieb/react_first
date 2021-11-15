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
	},
	{ timestamps: true },
);

export default mongoose.models.Carts || mongoose.model('Carts', cartsSchema);
