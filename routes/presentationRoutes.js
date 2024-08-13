const express = require("express");
const {
  createPresentation,
  getPresentationByTitle,
  addSlide,
  updateSlide,
  updateAuthors,
  deleteSlide,
  deletePresentation,
  getAllPresentations,
} = require("../controllers/presentationController");

const router = express.Router();

router.post("/", createPresentation);
router.get("/:title", getPresentationByTitle);
router.post("/:title/slides", addSlide);
router.put("/:title/slides/:order", updateSlide);
router.put("/:title/authors", updateAuthors);
router.delete("/:title/slides/:order", deleteSlide);
router.delete("/:title", deletePresentation);
router.get("/", getAllPresentations);

module.exports = router;
