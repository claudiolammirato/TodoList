const express = require('express');
const router = express.Router();
const {updateTodo, addTodo, deleteTodo, getTodosById, getTodos} = require('../controllers/todosControllers');

const logger = (req, resp, next) =>{
    if(req.params.id>100){
        next(new Error('id cannot be grater than 100'));
    }
    next();
};

router.all('*',(req, resp, next)=>{
    console.log('I am the all middleware');
    next();
});

router.get('/',(req,resp)=>{
    resp.json(getTodos());
});
router.get('/:id([0-9]+)', [logger, (req,resp)=>{
    const result = getTodosById(req.params.id);
    resp.status(result? 200 : 404).json(result? result:null);
}]);
router.delete('/:id([0-9]+)',(req,resp)=>{
    const deleted = deleteTodo(req.params.id);
    resp.status(deleted? 200: 404).json(deleted? deleted: null);
});

router.post('/',(req,resp)=>{
    console.log(req.body);
    resp.json(addTodo(req.body));
});

router.patch('/:id([0-9]+)',(req,resp)=>{
    console.log(req.body, req.params.id);
    const updTodo = updateTodo(req.params.id, req.body);
    resp.status(updTodo ? 200 : 404).json(updTodo ? updTodo : 'Record not found');
});

module.exports = router;