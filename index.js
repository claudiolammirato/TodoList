const express = require('express');
const app = express();

const todosRoutes = require('./routes/todos');


//app.use('/todos/:id', logger);

app.use('/todos', todosRoutes);

app.listen(4000, ()=> console.log('Listening on port 4000'));