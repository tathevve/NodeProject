import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../Controllers/TodoController";
import { body, validationResult } from "express-validator";
const router = express.Router();

router
  .get("/getTodos", (req, res) => {
    res.status(200).send(getTodos());
  })
  .get("/getTodoById/:id", (req, res) => {
    getTodoById(req, res);
  })
  .post("/create", (req, res) => {
    createTodo(req, res);
  })
  .patch("/update/:id", (req, res) => {
    updateTodo(req, res);
  })
  .post(
    "/register",
    body("email").isEmail(),
    body("firstName").exists({ checkFalsy: true }),
    body("password").isLength({ min: 5 }),
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      res.sendStatus(201);
    }
  )
  .delete("/delete/:id", (req, res) => {
    deleteTodo(req, res);
  });

export default router;
