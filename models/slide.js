const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  order: { type: Number, require: true },
});

module.exports = mongoose.model("Slide", slideSchema);
