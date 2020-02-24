const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    // ToDo model
    class Todo extends Sequelize.Model {}
    Todo.init({
        title: {
           type: Sequelize.STRING,
           allowNull: false,
           validate: {
               notEmpty: {
                   msg: "Title can't be empty string. Please enter value for title."
               },
               notNull : {
                msg: "Title can't be null. Please enter value for title."
               }
           }
        },
        isComplete: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
            validate: {
                notEmpty: {
                    msg: "isComplete can't be empty string. Please enter value for isComplete."
                },
                notNull : {
                 msg: "isComplete can't be null. Please enter value for isComplete."
                }
            }
        },
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {sequelize});
    
    return Todo;
};