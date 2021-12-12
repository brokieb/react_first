const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const settingsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Settings ||
  mongoose.model("Settings", settingsSchema);
