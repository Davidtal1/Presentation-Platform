const express = require("express");
const Presentation = require("../models/presentation");
const router = express.Router();

// Create a New Presentation
router.post("/", async (req, res) => {
  try {
    const { title, authors, publishDate, slides } = req.body;
    const presentation = new Presentation({
      title,
      authors,
      publishDate,
      slides,
    });
    await presentation.save();
    res.status(201).send(presentation);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Fetch a Presentation by Title
router.get("/:title", async (req, res) => {
  try {
    const presentation = await Presentation.findOne({
      title: req.params.title,
    });
    if (!presentation) return res.status(404).send("Presentation not found");
    res.send(presentation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add a Slide to a Presentation
router.post("/:title/slides", async (req, res) => {
  try {
    const presentation = await Presentation.findOne({
      title: req.params.title,
    });
    if (!presentation) return res.status(404).send("Presentation not found");
    presentation.slides.push(req.body);
    await presentation.save();
    res.status(201).send(presentation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Alter a Slide
router.put("/:title/slides/:order", async (req, res) => {
  try {
    const updateFields = { ...req.body };
    const order = req.params.order;

    const presentation = await Presentation.findOneAndUpdate(
      { title: req.params.title, "slides.order": parseInt(order) },
      {
        $set: {
          "slides.$.title": updateFields.title,
          "slides.$.order": order,
          "slides.$.content": updateFields.content,
        },
      },
      { new: true, useFindAndModify: false }
    );

    if (!presentation) return res.status(404).send("Slide not found");
    res.send(presentation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Alter the Authors List
router.put("/:title/authors", async (req, res) => {
  try {
    const presentation = await Presentation.findOneAndUpdate(
      { title: req.params.title },
      { $set: { authors: req.body.authors } },
      { new: true }
    );
    if (!presentation) return res.status(404).send("Presentation not found");
    res.send(presentation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a Slide
router.delete("/:title/slides/:order", async (req, res) => {
  try {
    const presentation = await Presentation.findOneAndUpdate(
      { title: req.params.title },
      { $pull: { slides: { order: parseInt(req.params.order) } } },
      { new: true }
    );
    if (!presentation) return res.status(404).send("Presentation not found");
    res.send(presentation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete Presentation
router.delete("/:title", async (req, res) => {
  try {
    const presentation = await Presentation.findOneAndDelete({
      title: req.params.title,
    });
    if (!presentation) return res.status(404).send("Presentation not found");
    res.send(presentation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get All Presentations
router.get("/", async (req, res) => {
  try {
    const presentations = await Presentation.find();
    res.send(presentations);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
