const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  userId:{type:String, require: false},
  title: { type: String, require: false },
  author: { type: String, require: false },
  imageUrl: { type: String, require: false },
  year: { type: Number, require: false },
  genre: { type: String, require: false },
  ratings: [
    {
      userId: { type: String, require: false },
      grade: { type: Number, require: false },
    },
  ],
  averageRating: { type: Number, require: false },
});

module.exports = mongoose.model("Book", bookSchema);
