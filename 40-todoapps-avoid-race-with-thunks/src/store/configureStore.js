import {createStore, applyMiddleware} from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import todoApp from '../reducers';

/*
const thunk = (store) => next => action => {

    if (typeof action === 'function') {
        return action(next, store.getState);
    }
    return next(action);
};
*/
const configureStore = () => {
    const middlewares = [promise, thunk];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    return createStore(
        todoApp,
        applyMiddleware(...middlewares)
    );
};

export default configureStore;
