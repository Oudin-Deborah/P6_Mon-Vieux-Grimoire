const express = require("express");
const router = express.Router();
const Book = require("../models/books_schema");
const bookCtrl = require("../controllers/books");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const sharp = require("../middleware/sharp-config");

router.post("/", auth, multer, sharp.sharp, bookCtrl.createBook);
router.put("/:_id", auth, multer, sharp.sharp, bookCtrl.modifyBook);
router.delete("/:_id", auth, multer, bookCtrl.deleteBook);
router.get("/bestrating", bookCtrl.bestRating);
router.get("/", bookCtrl.findBooks);
router.get("/:_id", bookCtrl.findOneBook);
router.post("/:_id/rating", auth, bookCtrl.rateBooks);
module.exports = router;
