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

const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;

    if (!console.group) {
        return rawDispatch;
    }

    return (action) => {
        console.group(action.type);
        console.log('prev state:', store.getState());
        console.log('action', action);
        const returnValue = rawDispatch(action);
        console.log('next state:', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};

const addLoggingToDispatch2 = (store) => {
    const next = store.dispatch;

    if (!console.group) {
        return next;
    }

    return (action) => {
        console.group(action.type);
        console.log('prev state:', store.getState());
        console.log('action', action);
        const returnValue = next(action);
        console.log('next state:', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};

const addLoggingToDispatch3 = (store) => {
    return (next) => {
        if (!console.group) {
            return next;
        }

        return (action) => {
            console.group(action.type);
            console.log('prev state:', store.getState());
            console.log('action', action);
            const returnValue = next(action);
            console.log('next state:', store.getState());
            console.groupEnd(action.type);
            return returnValue;
        };
    }
};

const addLoggingToDispatch4 = (store) => (next) => {
    if (!console.group) {
        return next;
    }

    return (action) => {
        console.group(action.type);
        console.log('prev state:', store.getState());
        console.log('action', action);
        const returnValue = next(action);
        console.log('next state:', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};

const wrapDispatchWithMmiddlewares = (store, middlewares) => {
    middlewares.forEach(middleware =>
        store.dispatch = middleware(store)
    );
};

const wrapDispatchWithMmiddlewares2 = (store, middlewares) => {
    middlewares.forEach(middleware =>
        store.dispatch = middleware(store)(store.dispatch)
    );
};

const configureStore = () => {
    const store = createStore(counter);
    store.dispatch = addLoggingToDispatch(store);
    return store;
};

const configureStore2 = () => {
    const store = createStore(counter);
    const middlewares = [];

    middlewares.push(addLoggingToDispatch2);
    wrapDispatchWithMmiddlewares(store, middlewares);

    return store;
};

const configureStore3 = () => {
    const store = createStore(counter);
    const middlewares = [];

    //middlewares.push(addLoggingToDispatch3);
    middlewares.push(addLoggingToDispatch4);
    wrapDispatchWithMmiddlewares2(store, middlewares);

    return store;
};

const store = configureStore3();

console.log("Initial state:", store.getState());
store.dispatch({type: "INCREMENT"});
store.dispatch({type: "DECREMENT"});
