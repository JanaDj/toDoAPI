const Sequelize = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'todos.db'
});

const db = {
    sequelize,
    Sequelize,
    models: {},
};

db.models.Todo = require('./models/todo.js') (sequelize);

module.exports = db;