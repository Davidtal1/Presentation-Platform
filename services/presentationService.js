const Presentation = require("../models/presentation");

exports.createPresentation = async (data) => {
  const presentation = new Presentation(data);
  return await presentation.save();
};

exports.getPresentation = async (title) => {
  return await Presentation.findOne({ title });
};

exports.addSlideToPresentation = async (title, slideData) => {
  const presentation = await Presentation.findOne({ title });
  if (!presentation) return null;
  presentation.slides.push(slideData);
  return await presentation.save();
};

exports.updateSlideInPresentation = async (title, order, updateFields) => {
  const presentation = await Presentation.findOneAndUpdate(
    { title, "slides.order": parseInt(order) },
    {
      $set: {
        "slides.$.title": updateFields.title,
        "slides.$.order": order,
        "slides.$.content": updateFields.content,
      },
    },
    { new: true, useFindAndModify: false }
  );
  return presentation;
};

exports.updatePresentationAuthors = async (title, authors) => {
  return await Presentation.findOneAndUpdate(
    { title },
    { $set: { authors } },
    { new: true }
  );
};

exports.deleteSlideFromPresentation = async (title, order) => {
  return await Presentation.findOneAndUpdate(
    { title },
    { $pull: { slides: { order: parseInt(order) } } },
    { new: true }
  );
};

exports.deletePresentationByTitle = async (title) => {
  return await Presentation.findOneAndDelete({ title });
};

exports.getAllPresentations = async () => {
  return await Presentation.find();
};
