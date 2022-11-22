const express = require("express");
const user = require("../Controllers/UserController");
const router = express.Router();

router
  .get("/getUsers", (req, res) => {
    res.status(200).send(user.getUsers());
  })
  .post("/register", (req, res) => {
    user.register(req, res);
  })
  .post("/signIn", (req, res) => {
    user.signIn(req, res);
  });

module.exports = router;
