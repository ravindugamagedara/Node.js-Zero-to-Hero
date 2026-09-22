const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running smoothly!");
});

//create data

const bookSchema = new mongoose.Schema({
  bookName: { type: String, required: true },
  bookStock: { type: Number, required: true },
});

bookModel = mongoose.model("Book", bookSchema);

app.post("/books", async (req, res) => {
  try {
    const newBook = await bookModel.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//read data

app.get("/books", async (req, res) => {
  try {
    const bookList = await bookModel.find();
    res.status(200).send(bookList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get by id

app.get("/books/:id" , async (req , res) => {
  try {
    const {id} = req.params;
    const book = await bookModel.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const connectionString = process.env.CONNECT_STRING;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
