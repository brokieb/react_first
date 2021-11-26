const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Discount = new Schema(
	{
		code: {
			type: String,
			required: true,
		},
		codeQty: {
			type: Number,
			required: true,
		},
		expiredIn: {
			type: Date,
			required: true,
		},
		type: {
			type: String,
			enum: ['PERCENT', 'AMOUNT'],
			default: 'PERCENT',
		},
		value: {
			type: Number,
			required: true,
		},
		limits: {
			type: String,
			enum: ['ONE_PER_USER', 'NONE'],
			default: 'NONE',
		},
	},
	{ timestamps: true },
);

export default mongoose.models.Discount || mongoose.model('Discount', Discount);
