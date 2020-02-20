const express = require('express');
const router = express.Router();
const dataManager = require('./dataManager');


/**
 * Method to wrap the try catch code to reduce repetative code
 * @param {function} cb 
 */
function asyncHandler(cb){
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err){
            next(err);
        }
    }
}

// send a GET to /todos request to get a list of ToDos
router.get('/todos', asyncHandler(async (req, res) =>{
    const toDos = await dataManager.getToDos();
    res.json(toDos);
}));

// send a GET request to /todo/:id to get a toDo by id
router.get('/todo/:id', asyncHandler(async (req, res)=>{
    const toDo = await dataManager.getToDo(req.params.id);
    if(toDo){
        res.json(toDo);
    } else {
        res.status(400).json({message: "ToDo ID is not valid."});
    }
}));

// send a POST request to /todo to create a new toDo
router.post('/todo', asyncHandler(async (req, res) =>{
    if(req.body.title){
        const toDo = await dataManager.createToDo({
            title: req.body.title,
            isComplete: false,
        });
        res.status(201).json(toDo);
    } else {
        res.status(400).json({message: "Please fill in all the required fields. Title and isComplete are required."});
    }
}));

// send a PUT request to /todo/:id to update existing toDo
router.put('/todo/:id', asyncHandler(async(req, res)=>{
    const toDo = await dataManager.getToDo(req.params.id);
    if(toDo){
        toDo.title = req.body.title;
        toDo.isComplete = req.body.isComplete;
        await dataManager.updateToDo(toDo);
        res.status(204).end();
    } else {
        res.status(400).json({message: "Invalid ID, toDo with specified id does not exist."});
    }
}));

// send a DELETE request to /todo/:id to delete a toDo
router.delete('/todo/:id', asyncHandler(async (req, res)=>{
    await dataManager.deleteToDo(req.params.id);
    res.status(204).end();
}));

module.exports = router;

