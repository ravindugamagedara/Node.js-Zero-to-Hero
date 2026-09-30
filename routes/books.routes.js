const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

//create data

const bookSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  bookStock: { type: Number, required: true },
});

bookModel = mongoose.model("Book", bookSchema);

router.post("/", async (req, res) => {
  try {
    const newBook = await bookModel.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//read data

router.get("/", async (req, res) => {
  try {
    const bookList = await bookModel.find();
    res.status(200).send(bookList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get by id

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookModel.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete data

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await bookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update data

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await bookModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
