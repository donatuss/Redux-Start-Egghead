const v4 = require('uuid/v4');

export const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: v4(),
        text
    };
};

export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id
    };
};