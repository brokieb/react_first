const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
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
    enum: ['NEW', 'NOT-PAID', 'PAID', 'SEND'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
