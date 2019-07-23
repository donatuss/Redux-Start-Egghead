let {createStore} = require('redux');

const todos = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                todo(undefined, action)
            ];
        case "TOGGLE_TODO":
            return state.map(x => todo(x, action));
        default:
            return state;
    }
};

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

const visiblityFilter = (state = "SHOW_ALL", action) => {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.filter;
        default:
            return state;
    }
};

const todoApp = (state = {}, action) => {
    return {
        todos: todos(
            state.todos,
            action
        ),
        visiblityFilter: visiblityFilter(
            state.visiblityFilter,
            action
        )
    }
};

const store = createStore(todoApp);
console.log(store.getState());
store.dispatch({id: 1, type: "ADD_TODO", text: "Earn 10$"});
store.dispatch({id: 2, type: "ADD_TODO", text: "Earn 20$"});
store.dispatch({type: "SET_VISIBILITY_FILTER", filter: "SHOW_COMPLETED"});
console.log(store.getState());

