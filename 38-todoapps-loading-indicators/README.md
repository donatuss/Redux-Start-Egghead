## 38 Todos Aplikacja - Część 33 - Wyświetlenie informacji ładowania danych
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Dokonamy zmian których końcowym celem będzie pokazywanie informacji o ładowaniu danych z backend-u.  
Zmienimy obecny kształt state aplikacji dodając informację o tym czy jesteśmy w trybie ładowania danych.
W aplikacji wygenerowanie nowej akcji REQUEST_TODOS będzie następowało z poziomu komponentu ``VisibleTodoList``.
```
Zmiana state z: 
{
    byId: {a219f18f: {id: "a219f18f", text: "E.798", completed: false}
          a3dae801: {id: "a3dae801", text: "E.501", completed: false}},
    idsByFilter: {
        active: [a219f18f]
        all: [a219f18f, a3dae801]
        completed:
    }      
}
na:
{
    byId: {a219f18f: {id: "a219f18f", text: "E.798", completed: false}
          a3dae801: {id: "a3dae801", text: "E.501", completed: false}},
    idsByFilter: {
        active: {
            ids: [a219f18f],
            isFetching:true
        all: {
            ids: [a219f18f, a3dae801],
            isFetching:true
            }
        completed:{}
    }      
}
```

Modyfikujemy plik reduktora ``createList.js``
```javascript
/* Zmieniam
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
*/
//na:
import {combineReducers} from "redux";
const createList = filter => {

    const ids = (state = [], action) => {
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

    const isFetching = (state = false, action) => {
        if (action.filter !== filter) {
            return state;
        }
        switch (action.type) {
            case "REQUEST_TODOS":
                return true;
            case "RECEIVE_TODOS":
                return false;
            default:
                return state;
        }
    };

    return combineReducers({
        ids,
        isFetching,
    })
};

//Oraz modyfikuje i dodaje selektory
//export const getIds = state => state;
export const getIds = state => state.ids;
export const getIsFetching = state => state.isFetching;
export default createList;
```
State zostanie zmodyfikowany, została wprowadzona obsługa akcji REQUEST_TODOS ale jeszcze akcja nigdzie nie jest generowana.
Modyfikuje plik zawierający funkcje konstruujące akcje ``todo.js``
```javascript
// actions/todo.js*
import * as api from "../api";

const v4 = require('uuid/v4');

const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response
});

export const fetchTodos = (filter) =>
    api.fetchTodos(filter).then(response =>
        receiveTodos(filter, response)
    );

/*... dochodzi funkcja requestTodos*/
export const requestTodos = (filter) => ({
    type: 'REQUEST_TODOS',
    filter
});;

```
W komponencie ``VisibleTodoList.js`` na chwile obecną przed wygenerowaniem akcji RECEIVE_TODOS wygenerowana zostanie akcja REQUEST_TODOS 
(potem będzie to modyfikowane). 
```javascript
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import TodoList from "../components/TodoList";
import * as actions from "../actions";
import {getVisibleTodos, getIsFetching} from "../reducers";

class VisibleTodoList extends Component {

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filter !== this.props.filter) {
            this.fetchData();
        }
    }

    fetchData() {
        const {filter, fetchTodos, requestTodos} = this.props;
        requestTodos(filter);
        fetchTodos(filter);
    }

    render() {
        const {toggleTodo, todos, isFetching} = this.props;
        if(isFetching && !todos.length){
            return <p>Loading ...</p>
        }
        return <TodoList onTodoClick={toggleTodo} todos={todos}/>
    }
}

const mapStateToProps = (state, param) => {
    const filter = param.match.params.filter || "all";
    return {
        todos: getVisibleTodos(state, filter),
        isFetching: getIsFetching(state, filter),
        filter
    };
};

export default withRouter(connect(mapStateToProps, actions)(VisibleTodoList));
```
W reduktorze doszedł ``reducers\index.js``  jeszcze selektor  ``getIsFetching(state, filter)``
``
export const getIsFetching = (state, filter) => fromList.getIsFetching(state.listByFilter[filter]);
``

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/37-todoapps-refactoring-reducers/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/39-.../README.md)
 </sub>