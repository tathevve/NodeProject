const express = require('express');
const list = require('../Controllers/TodoController');
const router = express.Router();


router
    .get('/getTodos', (req, res) => {
    res.status(200).send(list.getTodos());
    })
    .get('/getTodoById/:id', (req, res) => {
    list.getTodoById(req, res);
    })
    .post('/create', (req, res) => {
    list.createTodo(req, res);
    })
    .patch('/update/:id', (req, res)=> {
    list.updateTodo(req, res);
    })
    .delete('/delete/:id', (req, res) => {
    list.deleteTodo(req, res);
    });

module.exports = router;