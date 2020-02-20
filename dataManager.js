const fs = require('fs');

/**
 * Function to retrieve all ToDos
 * @param None
 */
function getToDos(){
    return new Promise( (resolve, reject) =>{
        fs.readFile('data.json', 'utf8', (err, data) =>{
            if(err) {
                reject(err);
            } else {
                const json = JSON.parse(data);
                resolve(json);
            }
        })
    });
}
/**
 * Function to retrieve a ToDo by ID 
 * @param {number} id , id of the ToDo we are searching for
 */
async function getToDo(id){
    const toDos = await getToDos();
    return toDos.find(toDo => toDo.id == id);
}
/**
 * Function to create a new toDo and add it to the toDo list 
 * @param {object} toDo , object containing new ToDo 
 */
async function createToDo(toDo){
    const toDos = await getToDos();
    toDo.id = await generateId();
    toDos.push(toDo);
    await saveData(toDos);
    return toDo;
}
/**
 * Function to update values of a existing toDo
 * @param {object} toDoToUpdate , object containing updated values for our toDo
 */
async function updateToDo(toDoToUpdate){
    const toDos = await getToDos();
    let toDo = toDos.find(td => td.id == toDoToUpdate.id);
    toDo.title = toDoToUpdate.title;
    toDo.isComplete = toDoToUpdate.isComplete;

    await saveData(toDos);
}
/**
 * Function to delete a toDo
 * @param {number} id , id of the toDo that we want to delete
 */
async function deleteToDo(id){
    let toDos = await getToDos();
    toDos = toDos.filter(toDo => toDo.id != id);
    await saveData(toDos);
}
/**
 * Function to save data into the json array 
 * @param {array} data , list of objects containing the ToDos
 */
function saveData(data){
    return new Promise ( (resolve, reject) =>{
        fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) =>{
            if(err){
                reject(err);
            } else {
                resolve();
            }
        })
    });
}
/**
 * Function to generate id for the next toDo
 * function returns last id (max num) from the list of toDos + 1
 * If there are no toDos in the json, it returns 1000 as the starting id
 * @param None 
 */
async function generateId(){
    const toDos = await getToDos();
    if(toDos.length) {
        return  Math.max.apply(Math, toDos.map(o => o.id)) + 1;
    }
    return 1000;
}

module.exports = {
    getToDo,
    getToDos,
    createToDo,
    updateToDo,
    deleteToDo
}