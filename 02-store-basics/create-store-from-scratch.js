const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener) => {
        listeners.push(listener);

        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    };

    dispatch({});

    return {getState, dispatch, subscribe};
};

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

const store = createStore(counter);

const render = () => {
    document.getElementById("h201").innerText = store.getState();
};
const logger = () => {
    console.log("logger:", store.getState())
};

store.subscribe(logger);
store.subscribe(render);
render();

let btn01 = document.getElementById("btn01");
let btn02 = document.getElementById("btn02");
let btn03 = document.getElementById("btn03");

btn01.addEventListener('click', () => {
    store.dispatch({type: "INCREMENT"});

});
btn02.addEventListener('click', () => {
    store.dispatch({type: "DECREMENT"});
});

btn03.addEventListener('click', () => {
    if (btn03.innerText === "Logger On") {
        store.subscribe(logger)();
        btn03.innerText = "Logger Off";
    } else {
        store.subscribe(logger);
        btn03.innerText = "Logger On";
    }
});
