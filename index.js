const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const bookRouter = require("./routes/books.routes");

require("dotenv").config();

app.use(express.json());
app.use("/books", bookRouter);

app.get("/", (req, res) => {
  res.send("Server is running smoothly!");
});


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
