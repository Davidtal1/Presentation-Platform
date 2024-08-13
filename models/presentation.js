const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema({
  title: String,
  order: Number,
  content: String,
});

const presentationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authors: [String],
  publishDate: Date,
  slides: [slideSchema],
});

const Presentation = mongoose.model("Presentation", presentationSchema);

module.exports = Presentation;
