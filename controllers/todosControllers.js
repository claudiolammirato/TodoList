const data = require('../data');

function getTodos() {
    return data.todos;
}

function getTodosById(id) {
    return data.todos.find((todo) => todo.id == id);
}

function deleteTodo(id) {
    const idx = data.todos.findIndex((todo) => todo.id == id);
    if(idx>-1){
        const ele = data.todos.splice(idx,1);
        return ele;
    }
    return 0;
}

module.exports = {
    getTodos,
    getTodosById,
    deleteTodo
}