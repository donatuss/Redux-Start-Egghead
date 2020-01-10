import * as api from "../api";
import {getIsFetching} from "../reducers";

const v4 = require('uuid/v4');

const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response
});

export const fetchTodos = (filter) => (dispatch, getState) =>   {
    if (getIsFetching(getState(), filter)) {
        return Promise.resolve();
    }
    dispatch(requestTodos(filter));
    return api.fetchTodos(filter).then(response => receiveTodos(filter, response)).then(dispatch);
};

export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
});

export const toggleTodo = (id) => ({
    type: 'TOGGLE_TODO',
    id
});

const requestTodos = (filter) => ({
    type: 'REQUEST_TODOS',
    filter
});