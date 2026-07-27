const express = require("express");
const router = express.Router();
const Book = require("../models/books_schema");
const bookCtrl = require("../controllers/books");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, bookCtrl.createBook);
router.put("/:_id", auth, multer, bookCtrl.modifyBook);
router.delete("/:_id", auth, multer, bookCtrl.deleteBook);
router.get("/", bookCtrl.findBooks);
router.get("/:_id", bookCtrl.findOneBook);
module.exports = router;
