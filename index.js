const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Welcome to my Node.js Server! gamma');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const connectionString = process.env.CONNECT_STRING;

mongoose.connect(connectionString)
.then(()=> {console.log("Connected to MongoDB")})
.catch((error) => {console.error("Error connecting to MongoDB:", error)});