## 26 Todos Aplikacja - Część 22 - Relokacja funkcji selektorów do reduktorów
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Krok 1. Uporządkownie reduktorów. Wydzielenie pliku index.js, Wydzielenie combineReducers do index.js 

```javascript
// reducers/todos.js
// Był:
import {combineReducers} from 'redux';

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
const todo = (state, action) => {
    ...
};

const todoApp = combineReducers({
    todos: todos,
});
export default todoApp;
```

```javascript
// Jest:
// reducers/index.js
import {combineReducers} from 'redux';
import todos from './todos';
const todoApp = combineReducers({
    todos: todos,
});

export default todoApp;


// reducers/todos.js
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

const todo = (state, action) => {
    ...
};

export default todos;
```
Krok 2. Funkcja getVisibleTodos z komponentu VisibleTodoList to funkcja która przygotowuje dane do wyświetlenia UI aplikacji (w tym przypadku dla komponentu TodoList).
Funkcje takie które wybierają dane z bieżącego stanu (state) aplikacji  (jako argument przyjmuje state.todos) nazywamy selektorami. Funkcje selektorów relokujemy do reduktorów. W tym przypadku
funkcje getVisibleTodos przeniesiemy do pliku reducers/todos.js    

```javascript
// containers/VisibleTodoList.js
// Jest:
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'all':
            return todos;
        case 'completed':
            return todos.filter(
                t => t.completed
            );
        case 'active':
            return todos.filter(
                t => !t.completed
            );
        default:
            return new Error(`Unknown filter: ${filter}`);
    }
};

const mapStateToProps = (state, {match: {params: {filter}}}) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            filter || "all"
        )
    };
};

export default withRouter(connect(mapStateToProps, {onTodoClick: toggleTodo})(TodoList));
```

Krok 2. Przeniesienie getVisibleTodos do pliku reducers/todos.js. Zgodnie z konwencja zmieniam nazwę argumentu z getVisibleTodos(todos, filter) na getVisibleTodos(state, filter). 
To wyraźnie wskazuje że zarówno reducer (todos) wykorzystuje state (modyfikuje go poprzez akcje) jak i selektor wykorzystuje (ale nie modyfikuje) celem pokazania na UI.
Domyślny eksport z pliku musi być reduktorem  (export default todos), ale selektor również eksportujemy i będziemy mieli do niego dostęp, jego "delegacje" o takiej samej nazwie 
umieszczamy w reducers/index.js.    

```javascript
// reducers/todos.js
// Jest:
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
const todo = (state, action) => {
    ...
};

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

export default todos;
```

```javascript
// reducers/index.js
// Jest:
import {combineReducers} from 'redux';
import todos, * as fromTodos from './todos';

const todoApp = combineReducers({
    todos: todos,
});

export const getVisibleTodos = (state, filter) => 
    fromTodos.getVisibleTodos(state.todos, filter);

export default todoApp;
```

Krok 3. Pozostało usunięcie getVisibleTodos z VisibleTodoList
```javascript
// containers/VisibleTodoList.js
// Jest:
import {getVisibleTodos} from "../reducers";

const mapStateToProps = (state, {match: {params: {filter}}}) => {
    return {
        todos: getVisibleTodos(
            state,
            filter || "all"
        )
    };
};

export default withRouter(connect(mapStateToProps, {onTodoClick: toggleTodo})(TodoList));
```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/26-todoapps-shorthand-notation/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/28-todoapps-normalizing-state/README.md)
 </sub>