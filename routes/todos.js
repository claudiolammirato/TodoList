const express = require('express');
const router = express.Router();
const {deleteTodo, getTodosById, getTodos} = require('../controllers/todosControllers');

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
    resp.json(getTodosById(req.params.id));
}]);
router.delete('/:id([0-9]+)',(req,resp)=>{
    const deleted = deleteTodo(req.params.id);
    resp.status(deleted? 200: 404).json(deleted? deleted: null);
});

module.exports = router;