const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');

// db realted 
const db = require('./db');
const {Todo} = db.models;

(async () => {
    await db.sequelize.sync();
    // try{
    
    // } catch (error){
    //     if(error.name === 'SequelizeValidationError') {
    //         const error = error.errors.map(err => err.message);
    //         console.error('Validation errors: ', errors);
    //     } else {
    //         throw error;
    //     }
    // }
}) ();

app.use(express.json());
app.use('/api', routes);

app.use((req,res,next)=>{
    const err = new Error('Not Found');
    res.status(404);
    next(err);
});

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

// start server
app.listen(port, () => {
    console.log('Server started on port' + port);
});