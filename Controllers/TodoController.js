const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const todos = "../Constants/todos.json";

const getTodos = () => {
  try {
    return fs.readFile(todos, "utf8");
  } catch (e) {
    return e;
  }
};

const getTodoById = (req, res) => {
  const id = req.params.id;
  const todos = getTodos();

  todos = JSON.parse(todos);

  if (!todos[id]) return res.status(404).send("not found");
  res.status(200).send(todos[id]);
};

const createTodo = (req, res) => {
  let uuid = uuidv4();
  let todo = {
    id: uuid,
    title: req.body.title,
    completed: req.body.completed,
  };
  todos.push(todo);
  res.status(200).send(todos);
};

const updateTodo = (req, res) => {
  const id = req.params.id;
  const todos = getTodos();

  todos = JSON.parse(todos);

  const changedUser = todos.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        title: req.params.title,
        completed: req.params.completed,
      };
    } else {
      return { ...item };
    }
  });
  console.log(changedUser);
  res.send(changedUser);
};

const deleteTodo = (req, res) => {
  let id = req.params.id;
  const todos = getTodos();
  todos = JSON.parse(todos);
  const filteredTodos = todos.filter((todo) => todo.id !== id);

  console.log(filteredTodos);
  res.send(filteredTodos);
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
