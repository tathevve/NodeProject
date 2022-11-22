const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const list = require("./Router/listRoute");
const users = require("./Router/userRoute");

require("dotenv").config();
// require("./config/database").connect();

const port = 5050;

const app = express();
app.use(bodyParser.json());
app.use("/list", list);
app.use("/users", users);
app.use(cors());

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
