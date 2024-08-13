const presentationService = require("../services/presentationService");

exports.createPresentation = async (req, res) => {
  try {
    const presentation = await presentationService.createPresentation(req.body);
    res.status(201).send(presentation);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getPresentationByTitle = async (req, res) => {
  try {
    const presentation = await presentationService.getPresentation(
      req.params.title
    );
    if (!presentation) return res.status(404).send("Presentation not found");
    res.send(presentation);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.addSlide = async (req, res) => {
  try {
    const presentation = await presentationService.addSlideToPresentation(
      req.params.title,
      req.body
    );
    if (!presentation) return res.status(404).send("Presentation not found");
    res.status(201).send(presentation);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateSlide = async (req, res) => {
  try {
    const presentation = await presentationService.updateSlideInPresentation(
      req.params.title,
      req.params.order,
      req.body
    );
    if (!presentation) return res.status(404).send("Slide not found");
    res.send(presentation);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updateAuthors = async (req, res) => {
  try {
    const presentation = await presentationService.updatePresentationAuthors(
      req.params.title,
      req.body.authors
    );
    if (!presentation) return res.status(404).send("Presentation not found");
    res.send(presentation);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deleteSlide = async (req, res) => {
  try {
    const presentation = await presentationService.deleteSlideFromPresentation(
      req.params.title,
      req.params.order
    );
    if (!presentation) return res.status(404).send("Presentation not found");
    res.send(presentation);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deletePresentation = async (req, res) => {
  try {
    const presentation = await presentationService.deletePresentationByTitle(
      req.params.title
    );
    if (!presentation) return res.status(404).send("Presentation not found");
    res.send(presentation);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAllPresentations = async (req, res) => {
  try {
    const presentations = await presentationService.getAllPresentations();
    res.send(presentations);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
