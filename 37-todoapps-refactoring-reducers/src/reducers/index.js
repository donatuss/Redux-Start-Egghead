import {combineReducers} from 'redux';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

const listByFilter = combineReducers({
    all: createList("all"),
    active: createList("active"),
    completed: createList("completed")
});

const index = combineReducers({
    byId,
    listByFilter
});

export const getVisibleTodos = (state, filter) => {
    const ids = fromList.getIds(state.listByFilter[filter]);
    return ids.map(id => fromById.getTodo(state.byId, id));
};

export default index;
