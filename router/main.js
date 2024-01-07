const express = require('express');
const Book  = require("../models/bookstore");

const router = express.Router();

// to create a book
router.post("/", async (req, res) => {
  try {
    const { title, author, publishedyear } = req.body;
    if (!title || !author || !publishedyear) {
      return res
        .status(400)
        .send({ message: "Please send all the required fields" });
    }
    const newBook = {
      title,
      author,
      publishedyear,
    };
    const book = await Book.create(newBook);
    res.status(201);
    res.send(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// to get all the books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(201).send({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

// to get a single book
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).send(book);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

//to update a book
router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishedyear } = req.body;
    if (!title || !author || !publishedyear) {
      res.status(400).send({ message: "Please send all the required fields" });
    }
    const id = req.params.id;
    const book = await Book.findByIdAndUpdate(id, req.body);
    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    return res.status(200).send(book);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

//to delete the book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      res.status(404).send({ message: "book not found" });
    }
    return res.status(200).send({ message: "book deleted sucessfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
