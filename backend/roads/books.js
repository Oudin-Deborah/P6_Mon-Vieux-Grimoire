const express = require("express");
const router = express.Router();
const Book = require ("../models/books_schema");

router.post("/", (req, res, next) => {
  delete req.body._id;
  const book = new Book({
    ...req.body,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Livre Ajouté!" }))
    .catch((error) => res.status(400).json({ error: error }));
});

router.put("/:_id", (req, res, next) => {
  Book.updateOne({ _id: req.params._id })
    .then(() => res.status(200).json({ message: "Livre modifié" }))
    .catch((error) => res.status(404).json({ error }));
});
router.delete("/:_id", (req, res, next) => {
  Book.deleteOne({ _id: req.params._id }, { ...req.body, _id: req.params._id })
    .then(() => res.status(200).json({ message: "Livre supprimé" }))
    .catch((error) => res.status(404).json({ error }));
});
router.get("/:_id", (req, res, next) => {
  Book.findOne({ _id: req.params._id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error: error }));
});
router.get("/" + "", (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error: error }));
});

module.exports = router;
