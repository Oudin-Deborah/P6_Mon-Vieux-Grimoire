const express = require("express");
const router = express.Router();
const Book = require("../models/books_schema");
const bookCtrl = require("../controllers/books");

router.post("/", bookCtrl.createBook);
router.put("/:_id", bookCtrl.modifyBook);
router.delete("/:_id", bookCtrl.deleteBook);
router.get("/:_id", bookCtrl.findOneBook);
router.get("/" + "", bookCtrl.findBooks);

module.exports = router;
