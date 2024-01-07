const express = require("express");
const { PORT, MONGODBURL } = require('./config');
const mongoose = require("mongoose");
const main = require("./router/main.js");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Welcome to bookstore");
});

app.use("/books", main);

mongoose
  .connect(MONGODBURL)
  .then(() => {
    console.log("connection established for db");
    app.listen(PORT, () => {
      console.log(`App is listening to the port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
