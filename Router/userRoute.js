import express from "express";
import {getUsers,register,signIn} from "../Controllers/UserController";
const router = express.Router();

router
  .get("/getUsers", (req, res) => {
    res.status(200).send(getUsers());
  })
  .post("/register", (req, res) => {
    register(req, res);
  })
  .post("/signIn", (req, res) => {
    signIn(req, res);
  });

export default router;
