const mongoose = require("mongoose");
const { number } = require("prop-types");

const bookSchema = mongoose.Schema({
  userId: { type: String, require: true },
  title: { type: String, require: true },
  author: { type: String, require: true },
  imageUrl: { type: String, require: false },
  year: { type: number, require: true },
  genre: { type: String, require: true },
  ratings: { type: number, require: true },
});
module.exports = mongoose.model("Book", bookSchema);
