import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import listRoute from "./Router/listRoute";
import userRoute from "./Router/userRoute";

import "dotenv/config"

const uri = process.env.DB_URI;
const port = 5050;
const app = express();
app.use(express.json())

// mongoose.connect(uri, () => {
//   app.use(express.json());
// });

app.use("/users", userRoute);
app.use("/list", listRoute);
app.use(cors());

app.listen(port, () => {
  console.log("Connected");
});

// app.use(bodyParser.json());

// app.use("/users", users);
