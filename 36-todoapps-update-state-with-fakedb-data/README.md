## 36 Todos Aplikacja - Część 31 - Aktualizacja state danymi z symulowanej bazy danych. Zmiana konstrukcji state
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

W obecnej chwili aplikacja z poziomu komponentu kontenerowego VisibleTodoList wywoływana jest funkcja fetchTodos generująca 
akcje RECEIVE_TODOS - która reprezentuje obiekt zawierający todos zaczytany z symulowanej bazy danych. 
Na poziomie reduktorów natomiast nie mamy obsługiwanej tej akcji. Przy okazji sterując reduktorem zmienimy strukturę state aplikacji.
W obecnej chwili state nasz wygląda:
```
{todos:
    byId: {a219f18f: {id: "a219f18f", text: "E.798", completed: false}
          a3dae801: {id: "a3dae801", text: "E.501", completed: false}},
    allIds: [a219f18f, a3dae801]      
}
```
Zmodyfikujemy go i będzie wyglądał:
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
W modyfikujemy plik reduktora todos
```javascript
///reducers/todos.js
import {combineReducers} from 'redux';

/*
// Usuwam obsługę akcji ADD_TODO, TOGGLE_TODO wprowadzam akcję RECEIVE_TODOS 
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
*/
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

/*
// Usuwam obsługę akcji ADD_TODO, TOGGLE_TODO wprowadzam akcję RECEIVE_TODOS  
const allIds = (state = [], action) => {
 switch (action.type) {
     case "RECEIVE_TODOS":
         return [...state, action.id];
     default:
         return state;
 }
};
*/
const allIds = (state = [], action) => {
    if (action.filter !== 'all') {
        return state;
    }

    switch (action.type) {
        case "RECEIVE_TODOS":
            return action.response.map(todo => todo.id);
        default:
            return state;
    }
};

//Wprowadzam dodatkowe 2 reduktory
const activeIds = (state = [], action) => {
    if (action.filter !== 'all') {
        return state;
    }

    switch (action.type) {
        case "RECEIVE_TODOS":
            return action.response.map(todo => todo.id);
        default:
            return state;
    }
};

const completedIds = (state = [], action) => {
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

//Definiuje nowy combine
const idsByFilter = combineReducers({
    all: allIds,
    active: activeIds,
    completed: completedIds
});

/* modyfikuje stary combine
const todos = combineReducers({
 byId,
 allIds
});
*/
const todos = combineReducers({
    byId,
    idsByFilter
});

/* Usuwam pobranie wszytkich todos ze state i akcje ADD_TODO, TOGGLE_TODO 
const getAllTodos = (state) => state.allIds.map(i => state.byId[i]);

const todo = (state, action) => {
 switch (action.type) {
     case "ADD_TODO":
         return {
             id: action.id,
             text: action.text,
             completed: false,
         };
     case "TOGGLE_TODO":
         if (state.id !== action.id) {
             return state;
         }
         return {
             ...state,
             completed: !state.completed
         };
     default:
         return state;
 }
};
*/

/* Zmieniam selector aby pobierał dane z backend-u w zalezności od filtra
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
*/

export const getVisibleTodos = (state, filter) => {
    const ids = state.idsByFilter[filter];
    return ids.map(id => state.byId[id]);
};

export default todos;
```
<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/35-todoapps-redux-middleware/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/37-.../README.md)
 </sub>