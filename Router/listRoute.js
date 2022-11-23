import express from 'express';
import {createTodo,deleteTodo,getTodoById,getTodos,updateTodo} from '../Controllers/TodoController';

const router = express.Router();

router
    .get('/getTodos', (req, res) => {
    res.status(200).send(getTodos());
    })
    .get('/getTodoById/:id', (req, res) => {
    getTodoById(req, res);
    })
    .post('/create', (req, res) => {
    createTodo(req, res);
    })
    .patch('/update/:id', (req, res)=> {
    updateTodo(req, res);
    })
    .delete('/delete/:id', (req, res) => {
    deleteTodo(req, res);
    });

export default router;