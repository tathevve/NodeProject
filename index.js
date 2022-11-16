const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const list = require("./Router/listRoute");

const PORT = 5050;

const app = express();
app.use(bodyParser.json());
app.use("/list", list);
app.use(cors());

app.listen(PORT, () => {
  console.log(`app is listening on ${PORT}`);
});
