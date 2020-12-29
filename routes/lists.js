const express = require('express');
const router = express.Router();
const {updateList, addList, deleteList, getListsById, getLists} = require('../controllers/listController');

router.get('/',(req,resp)=>{
    resp.json(getLists());
});
router.get('/:id([0-9]+)', (req,resp)=>{
    const result = getListsById(req.params.id);
    resp.status(result? 200 : 404).json(result? result:null);
});
router.delete('/:id([0-9]+)',(req,resp)=>{
    const deleted = deleteList(req.params.id);
    resp.status(deleted? 200: 404).json(deleted? deleted: null);
});

router.post('/',(req,resp)=>{
    console.log(req.body);
    resp.json(addList(req.body.name));
});

router.patch('/:id([0-9]+)',(req,resp)=>{
    console.log(req.body, req.params.id);
    const updList = updateList(req.params.id, req.body);
    resp.status(updList ? 200 : 404).json(updList ? updList : 'Record not found');
});

module.exports = router;