import {createStore} from 'redux';
import reducer from '../reducers/todos';

const persistedState = {
    todos: [{id: "0", text: "Earn.100.USD", completed: false}]
};

const configureStore = () => {
    return createStore(reducer, persistedState);
};

export default configureStore;
