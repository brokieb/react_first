const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
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
    discount: {
      discountValue: {
        type: Number,
        default: 0,
      },
      discountUntil: {
        type: Date,
      },
    },
    imageUrl: {
      type: String,
      required: true,
    },
    settings: {
      usersPerAccount: {
        type: Number,
        required: true,
      },
      active: {
        type: Boolean,
        default: true,
      },
    },
    SKU: {
      type: String,
      required: true,
    },
    auctionId: {
      type: Schema.Types.ObjectId,
      ref: "Auctions",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
