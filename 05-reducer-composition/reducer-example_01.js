const todos = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false,
                }
            ];
        case "TOGGLE_TODO":
            return state.map(todo => {
                if (todo.id !== action.id) {
                    return todo;
                }

                return {
                    ...todo,
                    completed: !todo.completed
                }
            });
        default:
            return state;
    }
};

let a1 = todos([], {id: 1, type:"ADD_TODO", text: "Earn 10$"});
let a2 = todos(a1, {id: 2, type:"ADD_TODO", text: "Earn 20$"});
let a3 = todos(a2, {id: 2, type:"TOGGLE_TODO"});
console.log(a3);
