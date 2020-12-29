const express = require('express');
const router = express.Router();
const {updateList, addList, deleteList, getListsById, getLists} = require('../controllers/listController');

router.get('/', async (req,resp)=>{
    try{
    const result = await getLists();
    resp.json(result);
    } catch (e) {
        resp.status(500).send(e.toString());
    }
});
router.get('/:id([0-9]+)', async (req,resp)=>{
    try{
    const result = await getListsById(req.params.id);
    resp.status(result? 200 : 404).json(result? result:null);
    } catch(e){
        resp.status(500).send(e.toString());
    }
});
router.delete('/:id([0-9]+)',async (req,resp)=>{
    try{
    const deleted = deleteList(req.params.id);
    resp.status(deleted? 200: 404).json(deleted? deleted: null);
    } catch (e){
        resp.srtatus(500).send(e.toString());
    }
});

router.post('/',async (req,resp)=>{
    try{
        const result = await addList(req.body.name);
    resp.json(result);
    } catch(e){
        resp.status(500).send(e.toString());
    }
});

router.patch('/:id([0-9]+)',async (req,resp)=>{
    try{
    
    const updList = await updateList(req.params.id, req.body.name);
    resp.status(updList ? 200 : 404).json(updList ? updList : 'Record not found');
    } catch(e){
        resp.status(500).send(e.toString());
    }
});

module.exports = router;