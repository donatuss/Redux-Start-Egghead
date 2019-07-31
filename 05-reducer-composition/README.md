## Kompozycja reduktorów - _reducer_  wyższego rzędu jako składowa szczegółowych _reducer-ów_ 
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Przypomnijmy iż funkcje reduktorów _(reducer)_ w Redux spełniają szczególną rolę. Funkcja ta pobiera poprzedni obiekt stanu aplikacji (state),  oraz akcje, 
zwraca natomiast następny stan aplikacji - zmieniony w wyniku działania akcji. 
W sytuacji rzeczywistej aplikacji obiekt stanu aplikacji może być bardzo złożony należy więc w sposób umiejętny komponować reduktory w taki sposób aby poszczególne
szczegółowe reduktory które operują na części stanu aplikacji składały sie na główny reduktor obsługujący cały stan.  

#### Przykład 1.1  - Reduktor todos - operuje na pełnym state, obsługując dodawanie zadań i przełączanie stanu (zrobione/nie zrobione) 
```javascript
const todos = (state = [], action) => {
    switch (action.type) {
        case "ADD_TODO":
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false,
                }
            ];
        case "TOGGLE_TODO":
            return state.map(todo => {
                if (todo.id !== action.id) {
                    return todo;
                }

                return {
                    ...todo,
                    completed: !todo.completed
                }
            });
        default:
            return state;
    }
}
``` 
#### Przykład 1.2  - Reduktor todos - wyodrębnienie szczegółowego reduktora operującego na części state której dotyczy, a nie na pełnym reprezentowanym przez tablice
```javascript
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
```
#### Przykład 2.1 - Rozszerzanie stanu, dołączanie nowych reduktorów
W rzeczywistych aplikacjach stan jest złożony i może przechowywać różnorakie dane. Przykładowo dla powyżej zdefiniowanych reduktorów - dodamy reduktor który będzie odpowiedzialny 
za obsługę widoczności zadań (todo) - visiblityFilter.       
```javascript
const visiblityFilter = (state = "SHOW_ALL", action) => {
    switch (action.type) {
        case "SET_VISIBILITY_FILTER":
            return action.filter;
        default:
            return state;
    }
};
```
visiblityFilter obsługuję tę cześć stanu aplikacji która będzie sterować pokazywaniem zadań. Musimy więc rozszerzyć stan w taki sposób aby zachowywał oprócz tablicy todos, jeszcze obecny filtr.
W rzeczywistych sytuacjach state to złożony obiekt który staramy się podzielić na logiczne części reprezentujące aplikację. Funkcje reduktorów ułatwiają nam ten podział.
#### Przykład 2.2 - Rozszerzanie stanu. Kompozycja reduktorów todos + visiblityFilter
```javascript
const todoApp = (state = {}, action) => {
    return {
        todos: todos(
            state.todos,
            action
        ),
        visiblityFilter: visiblityFilter(
            state.visiblityFilter,
            action
        )
    }
};

const store = createStore(todoApp);
console.log(store.getState());
 store.dispatch({id: 1, type: "ADD_TODO", text: "Earn 10$"});
 store.dispatch({id: 2, type: "ADD_TODO", text: "Earn 10$"});
 store.dispatch({type: "SET_VISIBILITY_FILTER", filter: "SHOW_COMPLETED"});
console.log(store.getState()); 

/*
State początkowy:
{ todos: [], visiblityFilter: 'SHOW_ALL' }

State wynikowy:
{ todos: 
   [ { id: 1, text: 'Earn 10$', completed: false },
     { id: 2, text: 'Earn 10$', completed: false } ],
  visiblityFilter: 'SHOW_COMPLETED' }
*/
```
W przypadku tym nie dość że rozszerzony został state aplikacji o visiblityFilter to dodatkowo zarysowany został logiczny podział aplikacji na część która operuje na zadaniach (todos), 
a część operującą na filtrach. Można wyobrazić sobie sytuacją gdzie logicznie sterowanie zadaniami jest oddzielone od ustawiania filtrowania. W teorii mogły by pracować nad tymi logikami
2 oddzielne grupy programistów. Inaczej mówiąc dobrze zorganizowany state w oparciu o reduktory separuje aplikację dzieląc je na logiczne fragmenty mogące być implementowane w pewnym odizolowaniu.

#### Przykład 2.3 - Kompozycja reduktorów todos + visiblityFilter, wykorzystanie wbudowanej w bibliotece Redux - funkcji _combineReducers()_  
Napisany powyżej _reducer_ można zastąpić poprzez użycie funkcji _combineReducers()_

```javascript
// oryginalny reducer aplikacji
const todoApp = (state = {}, action) => {
    return {
        todos: todos(
            state.todos,
            action
        ),
        visiblityFilter: visiblityFilter(
            state.visiblityFilter,
            action
        )
    }
};

// wykorzystanie funkcji combineReducers
let {combineReducers} = require('redux');
const todoApp = combineReducers({
    todos: todos,
    visiblityFilter: visiblityFilter
});

// wykorzystanie skrótowej notacji ES6
const todoApp = combineReducers({
    todos,
    visiblityFilter
});

```
#### Przykład 2.4 - Napisanie _combineReducers_ od podstaw
Poniżej napiszemy funkcje _combineReducers_  samodzielnie od podstaw. Przede wszystkim wiemy ze _reducer_ to funkcja która na podstawie state i action wylicza następny state.
Stąd na _combineReducers_ to funkcja która zwraca funkcję - która jako argument ma  state, action a zwraca nextState. W naszym szczególnym przypadku mogła by wyglądać ona tak: 
```javascript
const combineReducers = (reducers) => {
    return (state = {}, action) => {
        let nextState = {};
        nextState["todos"] = reducers["todos"](state["todos"], action);
        nextState["visiblityFilter"] = reducers["visiblityFilter"](state["visiblityFilter"], action);
        return nextState;
    }
};
```
aby uogólnić wykorzystamy funkcje javascript reduce
```javascript
const combineReducers = (reducers) => {
    return (state = {}, action) => {
        return Object.keys(reducers).reduce(
            (nextState, key) => {
                //dla key 'todos' nextState.todo = todo(state.todo, action) 
                //dla key 'visiblityFilter' nextState.visiblityFilter = visiblityFilter(state.visiblityFilter, action)
                nextState[key] = reducers[key](
                    state[key],
                    action
                );
                return nextState;
            },
            //początkowy state
            {}
        );
    }
};
```
#### Przykład - Funkcja javascript reduce
```javascript
let numbers = [175, 50, 25];

function myFunc(total, num) {
    return total - num;
}

console.log(numbers.reduce(myFunc)); // wynik 100 (175-50-25)
console.log(numbers.reduce(myFunc, 250)); // wynik 0 (250-175-50-25), 250 wartość początkowa
```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/04-immutable/README.md)
  | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/06-todo-app-first-draft/README.md)
 </sub>