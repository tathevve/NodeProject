const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
let todosList = "./Constants/todos.json";

const getTodos = () => {
  try {
    return fs.readFileSync(todosList, "utf8");
  } catch (e) {
    return e;
  }
};

const getTodoById = (req, res) => {
  const id = req.params.id;
  let todos = getTodos();

  todos = JSON.parse(todos);

  if (!todos[id]) return res.status(404).send("not found");
  res.status(200).send(todos[id]);
};

const createTodo = (req, res) => {
  let todos = getTodos();
  todos = JSON.parse(todos);
  let uuid = uuidv4();
  let todo = {
    id: uuid,
    title: req.query.title,
    completed: req.query.completed,
  };
  todos.push(todo);
  todos = JSON.stringify(todos, null, 2);
  console.log(todo, "todo");

  fs.writeFileSync(todosList, todos, (err) => {
    if (err) return err;
  });

  todos = JSON.parse(todos);
  res.status(200).send(todos);
};

const updateTodo = (req, res) => {
  const id = req.params.id;
  let todos = getTodos();
  todos = JSON.parse(todos);

  let changedUser = todos.map((item) => {
    console.log("item id", item.id);
    if (item.id == id) {
      return {
        ...item,
        title: req.query.title,
        completed: req.query.completed,
      };
    } else {
      return { ...item };
    }
  });

  changedUser = JSON.stringify(changedUser, null, 2);
  fs.writeFileSync(todosList, changedUser, (err) => {
    if (err) return err;
  });

  res.status(200).send(changedUser);
};

const deleteTodo = (req, res) => {
  let id = req.params.id;
  let todos = getTodos();
  todos = JSON.parse(todos);
  let filteredTodos = todos.filter((todo) => todo.id != id);

  console.log(filteredTodos);
  filteredTodos = JSON.stringify(filteredTodos, null, 2);
  fs.writeFileSync(todosList, filteredTodos, (err) => {
    if (err) return err;
  });
  res.status(200).send(filteredTodos);
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
