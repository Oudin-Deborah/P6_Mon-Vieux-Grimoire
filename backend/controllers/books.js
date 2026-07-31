const { JsonWebTokenError } = require("jsonwebtoken");
const Book = require("../models/books_schema");
const books_schema = require("../models/books_schema");
const fs = require("fs");
const { error } = require("console");
const sharp = require("../middleware/sharp-config");

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  delete bookObject._id;
  delete bookObject.userId;
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  book
    .save()
    .then(() => {
      res.status(201).json({ message: "Livre ajouté" });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }
    : { ...req.body };
  delete bookObject.userId;
  Book.findOne({ _id: req.params._id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(403).json({ message: "Unauthorized" });
      } else {
        Book.updateOne(
          { _id: req.params._id },
          { ...bookObject, _id: req.params._id },
        )
          .then(() => res.status(200).json({ message: "Livre modifié" }))
          .catch((error) => {
            console.log(error);
            res.status(400).json({ message: error.message });
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ message: error.message });
    });
};

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params._id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(400).json({ message: error.message });
      } else {
        const filename = book.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params._id })
            .then(() => {
              res.status(200).json({ message: "Livre supprimé" });
            })
            .catch((error) => res.status(401).json({ message: error.message }));
        });
      }
    })
    .catch((error) => {
      res.status(400).json({ message: error.message });
    });
};

exports.findOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params._id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error: error }));
};

exports.findBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error: error }));
};

exports.rateBooks = (req, res, next) => {
  Book.findOne({ _id: req.params._id })
    .then((book) => {
      if (!book) {
        return res.status(404).json({ message: "Livre non trouvé" });
      }
      const alreadyRated = book.ratings.some((rating) => {
        return rating.userId === req.auth.userId;
      });
      if (alreadyRated) {
        return res
          .status(400)
          .json({ message: "Vous avez déjà noté ce livre" });
      }
      book.ratings.push({ userId: req.auth.userId, grade: req.body.rating });
      const bookRating = book.ratings.reduce(
        (total, rating) => total + rating.grade,
        0,
      );
      book.averageRating = bookRating / book.ratings.length;
      book
        .save()
        .then(() => res.status(200).json(book))
        .catch((error) => res.status(400).json({ error: error }));
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.bestRating = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error: error }));
};
