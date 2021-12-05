const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Log = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    customMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Log || mongoose.model("Log", Log);
