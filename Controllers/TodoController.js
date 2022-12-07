import { v4 } from "uuid";
import fs from "fs";
import todosList from "../Constants/todos.json" assert { type: "json" };


const getTodos = () => {
  return todosList;
};

const getTodoById = (req, res) => {
  const id = req.params.id;
  let todos = getTodos();

  // todos = JSON.parse(todos);
  // console.log(todos.length, "todos");

  const findTodo = todos.find((todo) => Number(todo.id) === Number(id));

  if (!todos[id]) return res.status(404).send("not found");
  res.status(200).send(findTodo);
};

const createTodo = (req, res) => {
  let todos = getTodos();
  // todos = JSON.parse(todos);

  // let uuid = uuidv4();
  let todo = {
    id: todos.length + 1,
    title: req.query.title,
    description: req.query.description,
  };
  todos.push(todo);
  todos = JSON.stringify(todos, null, 2);
  
  // todosList = JSON.stringify(todosList, null, 2);
  // console.log(todo, "todo");
  console.log(typeof(todos), "todos");
  console.log(typeof(todosList), "todosList");

  fs.writeFileSync('C:/Users/Admin/Desktop/NodeProject/Constants/todos.json', todos, (err) => {
    if (err) return err;
  });

  // todos = JSON.parse(todos);
  res.status(200).send(todos);
};

const updateTodo = (req, res) => {
  const id = req.params.id;
  let todos = getTodos();
  // todos = JSON.parse(todos);

  let changedUser = todos.map((item) => {
    console.log("item id", item.id);
    if (item.id == id) {
      return {
        ...item,
        title: req.query.title,
        description: req.query.description,
      };
    } else {
      return { ...item };
    }
  });

  changedUser = JSON.stringify(changedUser, null, 2);
  fs.writeFileSync('C:/Users/Admin/Desktop/NodeProject/Constants/todos.json', changedUser, (err) => {
    if (err) return err;
  });

  res.status(200).send(changedUser);
};

const deleteTodo = (req, res) => {
  let id = req.params.id;
  let todos = getTodos();
  // todos = JSON.parse(todos);
  let filteredTodos = todos.filter((todo) => todo.id != id);

  console.log(filteredTodos);
  filteredTodos = JSON.stringify(filteredTodos, null, 2);
  fs.writeFileSync('C:/Users/Admin/Desktop/NodeProject/Constants/todos.json', filteredTodos, (err) => {
    if (err) return err;
  });
  res.status(200).send(filteredTodos);
};

export { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
