const express = require("express");
const router = express.Router();
const Book = require("../models/books_schema");
const bookCtrl = require("../controllers/books");
const auth = require("../middleware/auth");

router.post("/", auth, bookCtrl.createBook);
router.put("/:_id", auth, bookCtrl.modifyBook);
router.delete("/:_id", auth, bookCtrl.deleteBook);
router.get("/:_id", auth, bookCtrl.findOneBook);
router.get("/" + "", auth, bookCtrl.findBooks);

module.exports = router;
