const v4 = require('uuid/v4');

const fakeDatabase = {
    todos: [
        {
            id: v4(),
            text: 'P.' + Math.ceil(1000 * Math.random()),
            completed: true,
        },
        {
            id: v4(),
            text: 'P.' + Math.ceil(1000 * Math.random()),
            completed: true,
        },
        {
            id: v4(),
            text: 'P.' + Math.ceil(1000 * Math.random()),
            completed: false,
        },
        {
            id: v4(),
            text: 'P.' + Math.ceil(1000 * Math.random()),
            completed: false,
        }
    ],
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) => delay(1000).then(() => {
    if (Math.random() > 1) {
        throw new Error('Network simulation Exception');
    }

    switch (filter) {
        case 'all':
            return fakeDatabase.todos;
        case 'completed':
            return fakeDatabase.todos.filter(
                t => t.completed
            );
        case 'active':
            return fakeDatabase.todos.filter(
                t => !t.completed
            );
        default:
            throw new Error(`Unknown filter: ${filter}.`);
    }
});