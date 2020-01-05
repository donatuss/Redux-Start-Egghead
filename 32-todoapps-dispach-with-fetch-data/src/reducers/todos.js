import {combineReducers} from 'redux';

const byId = (state = {}, action) => {
    switch (action.type) {
        case "ADD_TODO":
        case "TOGGLE_TODO":
            return {
                ...state,
                [action.id]: todo(state[action.id], action)
            };
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [...state, action.id];
        default:
            return state;
    }
};

const todos = combineReducers({
    byId,
    allIds
});

const todo = (state, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                id: action.id,
                text: action.text,
                completed: false,
            };
        case "TOGGLE_TODO":
            if (state.id !== action.id) {
                return state;
            }
            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
};

const getAllTodos = (state) => state.allIds.map(i => state.byId[i]);

export const getVisibleTodos = (state, filter) => {
    const allTodos = getAllTodos(state);
    switch (filter) {
        case 'all':
            return allTodos;
        case 'completed':
            return allTodos.filter(
                t => t.completed
            );
        case 'active':
            return allTodos.filter(
                t => !t.completed
            );
        default:
            return new Error(`Unknown filter: ${filter}`);
    }
};

export default todos;
