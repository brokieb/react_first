const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	shortDescription: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	credentials: [
		{
			credentialsId: {
				type: Schema.Types.ObjectId,
				ref: 'Credentials',
			},
		},
	],
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
