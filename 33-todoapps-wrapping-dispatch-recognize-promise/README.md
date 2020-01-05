## 33 Todos Aplikacja - Część 28 - Opakowanie metody dispatch obiektu store - obsługa promises
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Na poziomie komponent VisibleTodoList pobieramy asynchronicznie dane z backend-u. Odbywa sie to w metodzie fetchData. 
Po pobraniu danych wywoływana jest wywoływany callback (dispatch) z akcja receiveTodos który może zmodyfikować state aplikacji.       
```javascript
//containers/VisibleTodoList.js
import * as actions from "../actions";
import {fetchTodos} from "../api";

class VisibleTodoList extends Component {

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        ...
        this.fetchData();
    }
    
    fetchData() {
        const {filter, receiveTodos} = this.props;
        fetchTodos(filter).then(todos => receiveTodos(filter, todos));
    }

    render() {
        const {toggleTodo, ...rest} = this.props;
        return <TodoList onTodoClick={toggleTodo} {...rest}/>
    }
}
```
Chcemy usunąć logikę pobrania danych z komponentu i przenieść ją do akcji. Na poziomie akcji utworzymy funkcję fetchTodos pobierającą dane z backu-endu  
```javascript
//actions/todo.js
//Dodano
import * as api from "../api";
const v4 = require('uuid/v4');

/*
Bylo:
export const receiveTodos = (filter, response) => ({
*/

//Jest:
const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response
});

/*
Dodano
Teraz uwaga - sama funkcja produkująca akcję powinna zwracać czysty obiekt (plain object) 
tutaj tak nie jest fetchTodos zwraca promise, pozostawienie tego bez zmian spowoduje blad 
Error: Actions must be plain objects. Use custom middleware for async actions.  
*/  
export const fetchTodos = (filter) =>
    api.fetchTodos(filter).then(response =>
        receiveTodos(filter, response)
    );

export const addTodo = (text) => ({
    type: 'ADD_TODO',
    id: v4(),
    text
});
```
```javascript
//containers/VisibleTodoList.js
import * as actions from "../actions";
//Usunieto 
//import {fetchTodos} from "../api";
class VisibleTodoList extends Component {

    /* Był: 
    fetchData() {
        const {filter, receiveTodos} = this.props;
        fetchTodos(filter).then(todos => receiveTodos(filter, todos));
    }
    */
        
    // Jest:
    // fetchTodos jest teraz z action
    fetchData() {
        const {filter, fetchTodos} = this.props;
        fetchTodos(filter);
    }
}
```
Pozostawienie teraz aplikacji spowoduje wytąpienie błedu Error: Actions must be plain object. To dlatego że 
funkcja produkująca akcję powinna zwracać czysty obiekt, a fetchTodos zdefiniowana w akcjach (actions) jest 
wywoływana przy próbie montowania komponentu componentDidMount. 
Aby błąd nie występował dokonamy opakowania domyślnego zachowania dispach Redux store w taki sposób aby był
przygotowany na obsługę promises.  Zmiany dokonujemy w configureStore.
```javascript
//store/configureStore
// Jest
import {createStore} from 'redux';
import todoApp from '../reducers';

const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;

    if (!console.group) {
        return rawDispatch;
    }

    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: red', action);
        const returnValue = rawDispatch(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};

//Dodajemy:
const addPromiseSupportToDispatch = (store) => {
    const rawDispatch = store.dispatch;

    return (action) => {
        if(typeof action.then === 'function'){
            return action.then(rawDispatch)
        }
        return rawDispatch;
    };
};

const configureStore = () => {
    const store = createStore(todoApp);
    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store);
    }
    
    //Dodajemy:
    store.dispatch = addPromiseSupportToDispatch(store);
    
    return store;
};

export default configureStore
```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/32-todoapps-dispach-with-fetch-data/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/34-.../README.md)
 </sub>