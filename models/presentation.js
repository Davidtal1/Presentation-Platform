const mongoose = require("mongoose");
const Slide = require("./slide");

const PresentationSchema = new mongoose.Schema({
  title: { type: String, unique: true, required: true },
  authors: { type: [String], required: true },
  publishDate: { type: Date, required: true },
  slides: [Slide.schema],
});

module.exports = mongoose.model("Presentation", PresentationSchema);
