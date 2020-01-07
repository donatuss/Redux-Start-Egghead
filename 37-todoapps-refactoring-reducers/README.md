## 37 Todos Aplikacja - Część 32 - Refactoring reducers
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Dokonamy refactoring funkcji reduktorów. Mam 2 pliki w reduktorach ``reducers/index.js reducers/todos.js``.
Gdzie ``index.js`` w obecnej formie jest złożeniem reduktora todos i dodatkowo zawiera wskazanie na umieszczony również
w  ``todos,js`` selektora getVisibleTodos. Usuwam plik ``index.js`` a plik ``todos.js`` zmieniam na ``index.js``  
```javascript
///reducers/index.js - Usuwam
import {combineReducers} from 'redux';
import todos, * as fromTodos from './todos';

const todoApp = combineReducers({
    todos: todos,
});
export const getVisibleTodos = (state, filter) => fromTodos.getVisibleTodos(state.todos, filter);
export default todoApp;
```
 
Skutkiem tej zmiany jest zmiana struktury state z 
```
{todos:
    byId: {a219f18f: {id: "a219f18f", text: "E.798", completed: false}
          a3dae801: {id: "a3dae801", text: "E.501", completed: false}},
    idsByFilter: {
        active: [a219f18f]
        all: [a219f18f, a3dae801]
        completed:
    }      
}
```
na:
```
{
    byId: {a219f18f: {id: "a219f18f", text: "E.798", completed: false}
          a3dae801: {id: "a3dae801", text: "E.501", completed: false}},
    idsByFilter: {
        active: [a219f18f]
        all: [a219f18f, a3dae801]
        completed:
    }      
}
```
Modyfikujemy nowo powstały plik index.js z dawnego todos.js Najpierw wydzielam z niego reduktow byId do oddzielnego piku ``byId.js``
```javascript
///reducers/byId.js
const byId = (state = {}, action) => {
    switch (action.type) {
        case "RECEIVE_TODOS":
            const nextState = {...state};
            action.response.forEach(todo => {
                nextState[todo.id] = todo;
            });
            return nextState;
        default:
            return state;
    }
};

//dodaje ta funkcje
export const getTodo = (state, id) => state[id];
export default byId;
```
Tworze nowy plik `createList.js`` z funkcją createList zwracająca reducer - która zastąpi 3 prawie identyczne reduktory
```javascript
///reducers/createList.js
// Bylo w todo.js*
const activeIds = (state = [], action) => {
    if (action.filter !== 'active') {
        return state;
    }

    switch (action.type) {
        case "RECEIVE_TODOS":
            return action.response.map(todo => todo.id);
        default:
            return state;
    }
};
*/

//definuje funkcje która pobiera argument filtr a zwraca funkcje reduktora
const createList = filter => (state = [], action) => {
    if (action.filter !== filter) {
        return state;
    }

    switch (action.type) {
        case "RECEIVE_TODOS":
            return action.response.map(todo => todo.id);
        default:
            return state;
    }
};

//to do pozniejszego użycia
export const getIds = state => state;
export default createList;
```
Modyfikuje plik ``index.js`` dawniej ``todos.js`` i wygląda kal poniżej. Zmiana z idsByFilter na listByFilter

```javascript
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
    return ids.map(id => {fromById.getTodo(state.byId, id)});
};
```
State wygląda teraz
```
{
    byId: {a219f18f: {id: "a219f18f", text: "E.798", completed: false}
          a3dae801: {id: "a3dae801", text: "E.501", completed: false}},
    listByFilter: {
        active: [a219f18f]
        all: [a219f18f, a3dae801]
        completed:
    }      
}
```
<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/36-todoapps-update-state-with-fakedb-data/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/38-todoapps-loading-indicators/README.md)
 </sub>