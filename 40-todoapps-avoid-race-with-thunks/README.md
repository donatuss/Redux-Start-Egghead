## Część 35 - Uniknięcie wyścigu generowania akcji w thunk
<sub>[<< Cofnij](https://github.com/donatuss/Redux-Start-Egghead/blob/master/README.md)</sub><br/>

Przy wydłużeniu timeout w dostarczeniu danych z backend-u w api możemy zaobserwować pewien problem. 
Pobierając dane todos używając ``fetchTodos`` z ``actions.todo. js`` nie sprawdzamy dane których żądaliśmy
już dotarły - po prostu generujemy kolejne akcje. To niepożądane zachowanie skutkuje tym, że w trakcie gdy 
jesteśmy stanie ładownia komponentów strony zaczynamy już wnioskować o nowy wygląd z drugiej strony obciążamy 
odpytaniami backend prosząc o dane których nawet nie zaprezentujemy.
Wyeliminujemy to zachowanie dodajac sprawdzenie czy jesteśmy w stanie ładowania danych - 
jeżeli tak wstrzymamy wykonywanie nowych akcji    
```javascript
//actions/todo.js

/* Było:
export const fetchTodos = (filter) => dispatch => {
    dispatch(requestTodos(filter));
    return api.fetchTodos(filter).then(response => receiveTodos(filter, response)).then(dispatch);
};
*/

/* 
getIsFetching - zdefiniowana w reduktorze createList.js informuje nas czy jesteśmy w trybie pobierania danych do todos
w zależności od filtra (all, active, completed). Należy też zadbac aby dostarczyć do getIsFetching aktualny state aplikacji
- czyli rozbudowujemy nasz thunk o dodatkową funkcję getState którą dostarczą w middleware
*/
export const fetchTodos = (filter) => (dispatch, getState) =>   {
    if (getIsFetching(getState(), filter)) {
        return;
    }
    dispatch(requestTodos(filter));
    return api.fetchTodos(filter).then(response => receiveTodos(filter, response)).then(dispatch);
};
```

```javascript
//store/configureStore,js

/* Było:
const thunk = (store) => next => action => {
    if (typeof action === 'function') {
        return action(next);
    }
    return next(action);
};
*/

// Jest:
const thunk = (store) => next => action => {
    if (typeof action === 'function') {
        return action(next);
    }
    return next(action);
};

const configureStore = () => {
    const middlewares = [promise, thunk];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }
    return createStore(
        todoApp,
        applyMiddleware(...middlewares)
    );
};
```
Zamiast "samodzielnie" robić obsługę thunk w middleware można skorzystać z gotowej biblioteki ``yarn add redux-thunk``
```javascript
//store/configureStore,js
const configureStore = () => {
    const middlewares = [promise, thunk];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }
    return createStore(
        todoApp,
        applyMiddleware(...middlewares)
    );
};
```
Dla spójności również zmodyfikuje jeszcze ``actions/todo.js`` tak aby funkcja fetchTodos maiła return takiego samego typu czyli Promise
```javascript
//actions/todo.js

/* Było:
export const fetchTodos = (filter) => (dispatch, getState) =>   {
    if (getIsFetching(getState(), filter)) {
        return;
    }
    dispatch(requestTodos(filter));
    return api.fetchTodos(filter).then(response => receiveTodos(filter, response)).then(dispatch);
};
*/

// Jest
export const fetchTodos = (filter) => (dispatch, getState) =>   {
    if (getIsFetching(getState(), filter)) {
        //Promise który rozwiązuje sie natychmiast
        return Promise.resolve();
    }
    dispatch(requestTodos(filter));
    return api.fetchTodos(filter).then(response => receiveTodos(filter, response)).then(dispatch);
};

```

<br/>
 
 <sub>[<< Poprzedni](https://github.com/donatuss/Redux-Start-Egghead/blob/master/39-todoapps-dispach-action-with-thunks/README.md)
   | [Następny >>](https://github.com/donatuss/Redux-Start-Egghead/blob/master/41-.../README.md)
 </sub>