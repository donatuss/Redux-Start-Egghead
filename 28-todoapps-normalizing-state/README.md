## 28 Todos Aplikacja - Część 23 - Unormowanie stanu aplikacji. W state umieszczamy obiekty indeksowane identyfikatorem.
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

W chwili obecnej stan aplikacji modyfikowany przez reduktor todos jest reprezentowany jako tablica. 
Dokładniej state to obiekt który pod prefiksem todos przechowuje tablice obiektów reprezentujących pojedynczy Todo  
```
{todos: [ 
  {id: "0c4fcce2-6ecd-42b4-81d4-bc4c26be6fdd", text: "E.375", completed: false}, 
  {id: "1z4fcce2-6ecd-42b4-81d4-bc4c26be6fdd", text: "E.371", completed: false}
  ]}
``` 
Chcemy zmodyfikować ten state aby przypominał bazę danych. A więc chcemy żeby obiekty Todo były reprezentowane przez obiekt 
zawierający w sobie indeksowane identyfikatorem obiekty reprezentujące pojedynczy Todo. Struktura po zmianach będzie wyglądać następująco
``` 
{todos:
  {byId:{
    a34d5a88-3ce7-4c7b-be83-0526f3c1911b: {id: "a34d5a88-3ce7-4c7b-be83-0526f3c1911b", text: "E.107", completed: false}
    1f8aab29-859d-4ee2-a63c-d64abe26de33: {id: "1f8aab29-859d-4ee2-a63c-d64abe26de33", text: "E.621", completed: false}}
  {allIds: ["a34d5a88-3ce7-4c7b-be83-0526f3c1911b", "1f8aab29-859d-4ee2-a63c-d64abe26de33"]}
}
``` 

Zmiany dokonywane na poziomie reduktora reducers/todos.js
```javascript
// Był:
const todos = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                todo(undefined, action)
            ];
        case "TOGGLE_TODO":
            return state.map(x => todo(x, action));
        default:
            return state;
    }
};

// Jest:
import {combineReducers} from 'redux';

const byId = (state = {}, action) => {
    switch (action.type) {
        case "ADD_TODO":
        case "TOGGLE_TODO":
            return {
                ...state,
                [action.id]: todo(state[action.id], action)
            };
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [...state, action.id];
        default:
            return state;
    }
};

const todos = combineReducers({
    byId,
    allIds
});
```

Zmiana w selekotrze getVisibleTodos
```javascript
// Był:
export const getVisibleTodos = (state, filter) => {
    switch (filter) {
        case 'all':
            return state;
        case 'completed':
            return state.filter(
                t => t.completed
            );
        case 'active':
            return state.filter(
                t => !t.completed
            );
        default:
            return new Error(`Unknown filter: ${filter}`);
    }
};

// Jest:
const getAllTodos = (state) => state.allIds.map(i => state.byId[i]);

export const getVisibleTodos = (state, filter) => {
    const allTodos = getAllTodos(state);
    switch (filter) {
        case 'all':
            return allTodos;
        case 'completed':
            return allTodos.filter(
                t => t.completed
            );
        case 'active':
            return allTodos.filter(
                t => !t.completed
            );
        default:
            return new Error(`Unknown filter: ${filter}`);
    }
};
```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/27-todoapps-colocation-selectors-with-reducers/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/29-.../README.md)
 </sub>