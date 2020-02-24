const fs = require('fs');

// db related
const db = require('./db');
const {Todo} = db.models;

/**
 * Function to retrieve all ToDos
 * @param None
 */
async function getToDos(){
    const toDos = await Todo.findAll({
        attributes: ['id', 'title', 'isComplete']
    });
    return toDos;
}
/**
 * Function to retrieve a ToDo by ID 
 * @param {number} id , id of the ToDo we are searching for
 */
async function getToDo(id){
    const toDo = await Todo.findByPk(id);
    return toDo;
}
/**
 * Function to create a new toDo and add it to the db
 * @param {object} toDo , object containing new ToDo 
 */
async function createToDo(toDo){
    const result = await Todo.create({
        title: toDo.title,
        isComplete: toDo.isComplete
    });
    return result;
}
/**
 * Function to update values of a existing toDo
 * @param {object} toDoToUpdate , object containing updated values for our toDo
 */
async function updateToDo(toDoToUpdate){
    const toDo = await getToDo(toDoToUpdate.id);
    toDo.title = toDoToUpdate.title;
    toDo.isComplete = toDoToUpdate.isComplete;
    await toDo.save();
}
/**
 * Function to delete a toDo
 * @param {number} id , id of the toDo that we want to delete
 */
async function deleteToDo(id){
    const toDo = await getToDo(id);
    await toDo.destroy();
}

module.exports = {
    getToDo,
    getToDos,
    createToDo,
    updateToDo,
    deleteToDo
}