import {createStore} from 'redux';
import reducer from '../reducers/todos';

const configureStore = () => {
    return createStore(reducer);
};

export default configureStore;

/*
export default () => {
    return createStore(reducer);
}
*/
