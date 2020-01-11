## Część 37 - Tworzenie danych w symulowanej bazie danych. Obsługa dodawania todo - AddTodo
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Do api dodamy dwie funkcje (Promise) które będą dodawały i zmieniały stan wykonania todo.
```javascript
//api/index.js
export const addTodo = (text) =>
    delay(500).then(() => {
        const todo = {
            id: v4(),
            text,
            completed: false
        };

        fakeDatabase.todos.push(todo);
        return todo;
    });

export const toggleTodo = (id) =>
    delay(500).then(() => {
       const todo = fakeDatabase.todos.find(t => t.id === id);
       return todo;
    });
```
Zmodyfikuje plik zawierający funkcje tworzące akcje actions.js
```javascript
//actions/todo.js

/* Usuwam 
const v4 = require('uuid/v4');

Zmieniam
export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
});
*/

// Zmiana na twórce akcji typu thunk
export const addTodo = (text) => (dispatch) => api.addTodo(text).then(response => {
    dispatch({
        type: 'ADD_TODO_SUCCESS',
        response
    })
});

```
Po zmiana akcji, czas na zmianę w obsługujących reduktorach i tak
```javascript
//reducers/byId.js
const byId = (state = {}, action) => {
    switch (action.type) {
        case "FETCH_TODOS_SUCCESS":
            const nextState = {...state};
            action.response.forEach(todo => {
                nextState[todo.id] = todo;
            });
            return nextState;
         //dodaje obsluge dodania todo
         case "ADD_TODO_SUCCESS":
             return {...state, [action.response.id]: action.response};
        default:
            return state;
    }
};
```
```javascript
//reducers/createList.js
/*
Było:
const ids = (state = [], action) => {

        if (action.filter !== filter) {
            return state;
        }

        switch (action.type) {
            case "FETCH_TODOS_SUCCESS":
                return action.response.map(todo => todo.id);
            default:
                return state;
        }
    };
*/

//JEST:
const createList = filter => {
    const ids = (state = [], action) => {
        switch (action.type) {
            case "FETCH_TODOS_SUCCESS":
                return filter === action.filter ?
                    action.response.map(todo => todo.id) :
                    state;
            case "ADD_TODO_SUCCESS":
                return filter !== "completed" ?
                    [...state, action.response.id]:
                    state;
            default:
                return state;
        }
    };
...
}
```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/40-todoapps-avoid-race-with-thunks/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/42-.../README.md)
 </sub>