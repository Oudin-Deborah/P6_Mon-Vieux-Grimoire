const express = require("express");
const app = express();
const books = require("../public/data/data.json");
app.use(express.json());
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://oudindeborah83_db_user:liCA798rB8wPdRjv@p6backend.pvq2b1x.mongodb.net/test?retryWrites=true&w=majority",
  )
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
  console.log(req.body);
  res.status(201).json({
    message: "Livre ajouté!",
  });
});
app.get("/api/books", (req, res, next) => {
  res.status(200).json(books);
});

module.exports = app;
