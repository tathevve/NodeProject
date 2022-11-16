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
    // .post('/create', (req, res) => {
    // list.create(req, res);
    // })
    // .patch('/update/:uuid', (req, res)=> {
    // list.update(req, res);
    // })
    // .delete('/delete/:uuid', (req, res) => {
    // list.destroy(req, res);
    // });

module.exports = router;