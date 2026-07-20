require("dotenv").config();
const express = require("express");
const app = express();
const books = require("../public/data/data.json");
app.use(express.json());
const Book = require("./models/Books");

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log("Connexion à MongoDB échouée !", err));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

app.post("/api/books", (req, res, next) => {
  delete req.body.id;
  const book = new Book({
    ...req.body,
  });
  book
    .save()
    .then(() => res.status(201).json({ message: "Livre Ajouté!" }))
    .catch((error) => res.status(400).json({ error: error }));
});

app.put("/api/books/:id", (req, res, next) => {
  Book.updateOne({ id: req.params.id })
    .then(() => res.status(200).json({ message: "Livre modifié" }))
    .catch((error) => res.status(404).json({ error }));
});
app.delete("/api/books/:id", (req, res, next) => {
  Book.deleteOne({ id: req.params.id }, { ...req.body, id: req.params.id })
    .then(() => res.status(200).json({ message: "Livre supprimé" }))
    .catch((error) => res.status(404).json({ error }));
});
app.get("/api/books/:id", (req, res, next) => {
  Book.findOne({ id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(404).json({ error: error }));
});
app.get("/api/books", (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error: error }));
});

module.exports = app;
