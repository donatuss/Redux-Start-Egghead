import {createStore} from 'redux';
import todoApp from '../reducers/todos';
import {loadState, saveState} from './localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();
const store = createStore(todoApp, persistedState);

// store.subscribe(() => {
//     saveState(store.getState());
// });

// store.subscribe(() => {
//     saveState({todos: store.getState().todos})
// });

store.subscribe(throttle(() => {
    saveState({todos: store.getState().todos});
}, 5000));

const configureStore = () => {
    return store;
};

export default configureStore;
