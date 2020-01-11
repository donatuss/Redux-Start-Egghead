## Część 36 - Przechwytywanie błędów aplikacji
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Prześledzimy proces przechwytywania błędów aplikacji na przykładzie błędu wyrzuconego z api z poziomu backend-u i obsługi
informującej o tym z poziomu UI aplikacji.
```javascript
//api/index.js
//Wyrzucamy błąd przy pobraniu todos
export const fetchTodos = (filter) => delay(1000).then(() => {
    if (Math.random() < 1) {
        throw new Error('Network simulation Exception');
    }
    ...
});
```
Obecnie błąd nie jest obsługiwany w żaden sposób. W pierwszej kolejności z poziomu funkcji generujących akcje dołączę obsługę błędu.
Zmienię też typy akcji z ``REQUEST_TODOS`` ``RECEIVE_TODOS`` na bardziej obrazujące logikę dostarczenia danych 
``FETCH_TODOS_REQUEST``, ``FETCH_TODOS_SUCCESS`` dojdzie nowa  ``FETCH_TODOS_FAILURE``. W samych pliku akcji zreorganizuje 
z oddzielnych funkcji ``receiveTodos``, ``requestTodos`` będą one wkomponowane w ``fetchTodos``

```javascript
//actions/todo.js

/* Usuwam 
const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response
});
const requestTodos = (filter) => ({
    type: 'REQUEST_TODOS',
    filter
});
*/

/* Było
export const fetchTodos = (filter) => (dispatch, getState) =>   {
    if (getIsFetching(getState(), filter)) {
        return Promise.resolve();
    }
    dispatch(requestTodos(filter));
    return api.fetchTodos(filter).then(response => receiveTodos(filter, response)).then(dispatch);
};
*/

// Zmiana na
export const fetchTodos = (filter) => (dispatch, getState) => {
    if (getIsFetching(getState(), filter)) {
        return Promise.resolve();
    }

    dispatch({
        type: 'FETCH_TODOS_REQUEST',
        filter
    });

    return api.fetchTodos(filter).then(
        response => {
            dispatch({
                type: 'FETCH_TODOS_SUCCESS',
                filter,
                response
            });
        },
        error => {
            dispatch({
                type: 'FETCH_TODOS_FAILURE',
                filter,
                message: error.message
            })
        }
    );
};
```
Zmiana typów akcji, dodanie nowego typu wymusza zmianę na reduktorach obsługujących akcję.
```javascript
//reducers/createList.js
import {combineReducers} from 'redux';

const createList = filter => {

    const ids = (state = [], action) => {

        if (action.filter !== filter) {
            return state;
        }

        switch (action.type) {
            //Zmiana z: case "RECEIVE_TODOS":
            case "FETCH_TODOS_SUCCESS"::
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
            //Zmiana z: case "REQUEST_TODOS":
            case "FETCH_TODOS_REQUEST":
                return true;
            //Zmiana z: case "RECEIVE_TODOS":    
            case "FETCH_TODOS_SUCCESS":
            //Dodanie    
            case "FETCH_TODOS_FAILURE":    
                return false;
            default:
                return state;
        }
    };
    
    // Dodany dodatkowy reduktor - w state rozszerzony zostanie o errorMessage
    const errorMessage = (state = null, action) => {

        if (action.filter !== filter) {
            return state;
        }

        switch (action.type) {
            case "FETCH_TODOS_FAILURE":
                return action.message;  
            case "FETCH_TODOS_SUCCESS":
            case "FETCH_TODOS_REQUEST":
                return null;  
            default:
                return state;
        }
    };
    
    // dołożenie errorMessage do combine
    return combineReducers({
            ids,
            isFetching,
            errorMessage
        }
    )
};

export const getIds = state => state.ids;
export const getIsFetching = state => state.isFetching;
// dodanie nowego selektora informującego jaki jest stan w kontekście errorMessage
export const getErrorMessage = state => state.errorMessage;
export default createList;
```
Mamy odpowiednie funkcję akcji, obsługe na poziomie reduktorów (w tym odpowiedni selektor) przejdziemy do modyfikacji komponentu 
``VisibleTodoList`` który zapewni obsługe błędu na UI.

```javascript
//container/VisibleTodoList.js

/*
1. Zapewniamy sobie dostęp do selektora getErrorMessage
*/
import {getVisibleTodos, getIsFetching, getErrorMessage} from "../reducers";

class VisibleTodoList extends Component {

    ...
    
    render() {
        const {toggleTodo, todos, isFetching, errorMessage} = this.props;
        if(isFetching && !todos.length){
            return <p>Loading ...</p>
        }
        
        /*
        3  - pokazanie w przypadku błędu komponentu FetchError - pokazujacego przycisk i na 
        kliknięciu odpalającego callbacka realizującego ponowne pobranie danych todos   
        */
        if (errorMessage && !todos.length) {
            return <FetchError onRetry={() => this.fetchData()} message={errorMessage}/>
        }
        
        return <TodoList onTodoClick={toggleTodo} todos={todos}/>
    }
}

const mapStateToProps = (state, param) => {
    const filter = param.match.params.filter || "all";
    return {
        todos: getVisibleTodos(state, filter),
        isFetching: getIsFetching(state, filter),
        /*
        2. Zapewniamy sobie zmienna errorMessage ze state w props komponentu
           będzie widoczna w render
        */
        errorMessage: getErrorMessage(state, filter),
        filter
    };
};

export default withRouter(connect(mapStateToProps, actions)(VisibleTodoList));
```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/40-todoapps-avoid-race-with-thunks/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/42-todoapps-create-data-addtodo/README.md)
 </sub>