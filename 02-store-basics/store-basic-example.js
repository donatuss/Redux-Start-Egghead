const counter = (state = 0, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
};

const {createStore} = Redux;
const store = createStore(counter);

const render = () => {
    document.getElementById("h201").innerText = store.getState();
};

store.subscribe(render);
render();

document.getElementById("btn01").addEventListener('click', () => {
    store.dispatch({type: "INCREMENT"})
});
document.getElementById("btn02").addEventListener('click', () => {
    store.dispatch({type: "DECREMENT"})
});

console.log("Initial state1:", store.getState());
store.dispatch({type: "INCREMENT"});
console.log("Action INCREMENT state:", store.getState());
store.dispatch({type: "INCREMENT"});
console.log("Action INCREMENT state:", store.getState());