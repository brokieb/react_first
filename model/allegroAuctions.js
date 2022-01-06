const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auctionSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
    },
    source: {
      type: String,
      default: "LOCAL",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    category: {
      id: {
        type: Number,
      },
    },
    delivery: {
      shippingRates: {
        id: {
          type: String,
        },
      },
    },
    description: [
      {
        sections: [
          {
            type: {
              type: String,
            },
            content: {
              type: String,
            },
            url: {
              type: String,
            },
          },
        ],
      },
    ],
    images: [
      {
        url: {
          type: String,
        },
      },
    ],
    parameters: [
      {
        parameterId: {
          type: Number,
        },
        parameterValue: [],
      },
    ],
    sellingMode: {
      format: {
        type: String,
      },
      price: {
        amount: {
          type: Number,
        },
        currency: {
          type: String,
        },
      },
    },
    stock: {
      type: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Auctions ||
  mongoose.model("Auctions", auctionSchema);
