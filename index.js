const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const list = require("./Router/listRoute");
const users = require("./Router/userRoute");

require("dotenv").config();
// require("./config/database").connect();

const uri = process.env.DB_URI;
const port = 5050;
const app = express();

mongoose.connect(uri, () => {
  app.use(express.json());

  // app.use(jwtVerify);

  app.use("/users", users);
  app.use("/list", list);
  app.use(cors());

  app.listen(port, () => {
    console.log("Connected");
  });
});

// app.use(bodyParser.json());

// app.use("/users", users);
