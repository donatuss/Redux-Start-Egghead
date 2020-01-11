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
    if (Math.random() > 0.99) {
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

export const addTodo = (text) =>
    delay(500).then(() => {
        const todo = {
            id: v4(),
            text,
            completed: false
        };

        fakeDatabase.todos.push(todo);
        return todo;
    });

export const toggleTodo = (id) =>
    delay(500).then(() => {
       const todo = fakeDatabase.todos.find(t => t.id === id);
       return todo;
    });